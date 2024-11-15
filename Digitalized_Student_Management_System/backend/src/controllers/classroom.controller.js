import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Classroom } from "../models/classroom.models.js";
import { Teacher } from "../models/teacher.models.js";
import { uploadOnCloudinary,downloadFromCloudinary } from "../utils/cloudinary.js"
import { v4 as uuidv4 } from "uuid";
import { Student } from "../models/student.models.js";


const generateClassCode = async () => {
    const uuid = uuidv4()
    const encoder = new TextEncoder();
    const data = encoder.encode(uuid);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.slice(0, 6).map(x => x.toString(16).padStart(2, '0')).join('');

}

const createClass = asyncHandler(async (req, res,next) => {
    const { classname, subject, section, year } = req.body;

    // console.log(classname, subject, section, year);
    if (
        [classname, subject, section, year].some((field) =>
            field?.trim() === "")
    ) {
        return next(new ApiError(400, "Please fill out all the required fields before submitting"));
    }

    const code = await generateClassCode();
    // console.log(code);

    const user=await Teacher.findById(req.user._id);

    const classroom = await Classroom.create({
        classname,
        subject,
        section,
        year,
        owner: user.username,
        classCode: code
    })

    const createdClassroom = await Classroom.findById(classroom._id);

    if (!createdClassroom) {
        return next(new ApiError(500, "An error occurred while creating the class. Please try again later."));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdClassroom, "Classroom created successfully!"));

})

const joinClass = asyncHandler(async (req, res,next) => {
    const { classCode } = req.body;

    if (!classCode) {
       return next(new ApiError("Please provide a class code."))
    }

    const classroom =await Classroom.findOne({ classCode })

    const existMember=classroom.members.includes(req.user?._id);
    
    if(existMember){
        return next(new ApiError(400,"You have already joined this class"))
    }

    const student = await Student.findByIdAndUpdate(
        req.user?._id,
        {
            $push: {
                classId: classroom._id,
                classCode
            }
        }).select('-password -refreshToken');
    
    await classroom.updateOne({
        $push:{
            members:student._id
        }
    })
    
    const updatedStudent=await Student.findById(student._id)
    const updatedCLass=await Classroom.findById(classroom._id)

    return res
        .status(200)
        .json(new ApiResponse(200, { student:updatedStudent, classroom:updatedCLass }, "Class Joined Successfully !"))
})

const postAssignment = asyncHandler(async (req, res,next) => {

    const { title,classCode } = req.body;

    if (
        [title].some((field) =>
            field?.trim() === "")
    ) {
        return next(new ApiError(400, "Please fill out all the required fields before submitting"));
    }
    
    const LocalPath = req.file?.path;

    if (!LocalPath) {
        return next(new ApiError(401, "The file was not uploaded. Please try again."));
    }

    const uploaded = await uploadOnCloudinary(LocalPath);

    if (!uploaded) {
        return next(new ApiError(500, "An error occurred while uploading the file. Please try again later."));
    }

    const classroom = await Classroom.findOneAndUpdate(
        { classCode },
        {
            $push: {
                assignment: {
                    title,
                    attachment: uploaded.url,
                    createdAt: new Date(),
                },
            },
        },
        { new: true }
    ).select("-members");    

    return res
        .status(200)
        .json(
            new ApiResponse(200, classroom, "File uploaded successfully!!")
        )
});

const download=asyncHandler(async(req,res,next)=>{
    const {url}=req.body;

    if(!url){
        return next(new ApiError(400,"File Not Found"));
    }

    downloadFromCloudinary(url);

    res.status(200).json(new ApiResponse(200,"File Downloaded Successfully!!"));
});

const postNotice = asyncHandler(async (req, res,next) => {

    const { description,classname } = req.body;

    if (
        [description,classname].some((field) =>
            field?.trim() === "")
    ) {
        return next(new ApiError(400, "Please fill out all the required fields before submitting"));
    }

    const LocalPath = req.file?.path;
    
    if (!LocalPath) {
        return next(new ApiError(401, "The file could not be uploaded. Please try again."));
    }

    const uploaded = await uploadOnCloudinary(LocalPath);

    if (!uploaded) {
        return next(new ApiError(500, "There was an error while uploading the file. Please try again later."));
    }

    const classroom = await Classroom.findOneAndUpdate(
        { classname },
        {
            $push: {
                notice: {
                    description,    
                    attachment: uploaded.url,
                    createdAt: new Date(),
                },
            },
        },
        { new: true }
    ).select("-members");    

    
    return res
        .status(200)
        .json(
            new ApiResponse(200, classroom, "File uploaded successfully!")
        )
})

const postResult = asyncHandler(async (req, res,next) => {

    const { description,classname } = req.body;

    if (
        [description,classname].some((field) =>
            field?.trim() === "")
    ) {
        return next(new ApiError(400, "Please fill out all the required fields before submitting"));
    }

    const LocalPath = req.file?.path;
    
    if (!LocalPath) {
        return next(new ApiError(401, "The file could not be uploaded. Please try again."));
    }

    const uploaded = await uploadOnCloudinary(LocalPath);

    if (!uploaded) {
        return next(new ApiError(500, "There was an error while uploading the file. Please try again later."));
    }

    const classroom = await Classroom.findOneAndUpdate(
        { classname },
        {
            $push: {
                result: {
                    description,    
                    attachment: uploaded.url,
                    createdAt: new Date(),
                },
            },
        },
        { new: true }
    ).select("-members");    

    
    return res
        .status(200)
        .json(
            new ApiResponse(200, classroom, "File uploaded successfully!")
        )
})

const getJoinedClasses=asyncHandler(async(req,res)=>{


        const stud=await Student.findById(req.user?._id);
        
        if(!stud){
            return next(new ApiError(400,"Unauthorized request. Please check your permissions or log in again."));
        }

        var classArr=[];

        var owner;
        for (const element of stud.classId) {
            const classInfo = await Classroom.findById(element);
            
            if (!classInfo) {
                return next(new ApiError(400, "The classroom does not exist. Please check the details and try again."));
            }
            
            classArr.push(classInfo);
        }
        
        // console.log(classArr)

        return res
                  .status(200)
                  .json(new ApiResponse(200, { classArr }, "Retrived"))

    
})

const getCreatedClasses=asyncHandler(async(req,res)=>{

    const user=await Teacher.findById(req.user._id);

    if(!user) return next(new ApiError(400,"Unauthorized request. Please check your permissions or log in again."));

    const classes = await Classroom.find({owner:user.username})

    if(!classes) next(new ApiError(400,"Class not found. Please check the details and try again"));

        return res
                  .status(200)
                  .json(new ApiResponse(200, { classes }, "Retrived"))

})

const getJoinedStudents = asyncHandler(async(req,res)=>{
    const {classCode} = req.body    
    if (!classCode) {
        return next(new ApiError("Please provide a class code."));
    }

    const classroom =await Classroom.findOne({ classCode })

    if(!classroom) return next(new ApiError(400,"Class not found. Please check the details and try again."))
    
    const members = classroom.members
    
    const students = await Promise.all(
        members.map(async(studId)=>{
            const studInfo = await Student.findById(studId).select("username profile")
            return studInfo
        })
    )
    
    return res.status(200)
                .json(new ApiResponse(200,{students},"Retrived"))
    
})

export { createClass, 
         joinClass, 
         postAssignment,
         getJoinedClasses,
         getCreatedClasses,
         getJoinedStudents,
         postNotice,
         postResult,
         download
        }