import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Classroom } from "../models/classroom.models.js";
import { Teacher } from "../models/teacher.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
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

const getOwnerName=asyncHandler(async(req,res)=>{
    const {classCode}=req.body;

    const classInfo=await Classroom.findOne({classCode})

    const owner=await Teacher.findById(classInfo.owner)

    return owner.username;

})

const createClass = asyncHandler(async (req, res) => {
    const { classname, subject, section, year } = req.body;

    console.log(classname, subject, section, year);
    if (
        [classname, subject, section, year].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const code = await generateClassCode();
    console.log(code);

    const classroom = await Classroom.create({
        classname,
        subject,
        section,
        year,
        owner: await Teacher.findById(req.user._id),
        classCode: code
    })

    const createdClassroom = await Classroom.findById(classroom._id);

    if (!createdClassroom) {
        throw new ApiError(500, "Something went wrong while creating class");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdClassroom, "Classroom has been successfully created"));

})

const joinClass = asyncHandler(async (req, res) => {
    const { classCode } = req.body;

    if (!classCode) {
        throw new ApiError("Class Code Is Required")
    }

    const classroom =await Classroom.findOne({ classCode })

    const existMember=classroom.members.includes(req.user?._id);
    
    if(existMember){
        throw new ApiError(400,"Already Joined")
    }

    const student = await Teacher.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                classId: classroom._id,
                classCode
            }
        }).select('-password -refreshToken');
    
    await classroom.updateOne({
        $push:{
            members:student._id
        }
    })
    
    const updatedStudent=await Teacher.findById(student._id)
    const updatedCLass=await Classroom.findById(classroom._id)

    return res
        .status(200)
        .json(new ApiResponse(200, { student:updatedStudent, classroom:updatedCLass }, "Class Joined Successfully"))
})

const postAssignment = asyncHandler(async (req, res) => {

    const { title, description, dueDate } = req.body;

    if (
        [title, description, dueDate].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const fileLocalPath = req.file?.path;

    if (!fileLocalPath) {
        throw new ApiError(401, "File not uploaded");
    }

    const file = uploadOnCloudinary(fileLocalPath);

    if (!file) {
        throw new ApiError(500, "Error while uploading file on cloudinary")
    }

    const classroom = await Classroom.findByIdAndUpdate(req.user?._id, {
        $push: {}
    },
        { new: true }
    ).select("-members")

    return res
        .status(200)
        .json(
            new ApiResponse(200, classroom, "File uploaded successfully")
        )
})

const getJoinedClasses=asyncHandler(async(req,res)=>{


        const stud=await Student.findById(req.user?._id);
        
        if(!stud){
            throw new ApiError(400,"Student does not exist")
        }

        var classArr=[];

        for (const element of stud.classId) {
            const classInfo = await Classroom.findById(element);
            
            if (!classInfo) {
                throw new ApiError(400, "Classroom does not exist");
            }
            
            classArr.push(classInfo);
        }
        
        console.log(classArr)

        return res
                  .status(200)
                  .json(new ApiResponse(200, { classArr }, "Retrived"))

    
})

const getCreatedClasses=asyncHandler(async(req,res)=>{

    const classes = await Classroom.find({owner:req.user?._id})

    
        return res
                  .status(200)
                  .json(new ApiResponse(200, { classes }, "Retrived"))

})



export { createClass, joinClass, postAssignment ,getJoinedClasses,getCreatedClasses}