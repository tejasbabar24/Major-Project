import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Classroom } from "../models/classroom.models.js";
// import { Teacher } from "../models/teacher.models.js";
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

const createClass = asyncHandler(async (req, res) => {
    const { classname, subject, section, year } = req.body;

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
        owner: req.user._id,
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

    const classroom = Classroom.findOne({ classCode })

    const student = Student.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                classId: classroom._id,
                classCode
            }
        }).select('-password -refreshToken');

    return res
        .status(200)
        .json(new ApiResponse(200, { student, classroom }, "Class Joined Successfully"))
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

export { createClass, joinClass, postAssignment }