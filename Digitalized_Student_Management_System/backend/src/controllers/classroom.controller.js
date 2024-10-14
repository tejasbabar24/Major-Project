import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Classroom } from "../models/classroom.models.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const createClass = asyncHandler(async (req, res) => {
    const { classname, subject, section, year, owner } = req.body;

    if (
        [classname, subject].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const classroom = await Classroom.create({
        classname,
        subject,
        section,
        year,
        owner: req.user._id
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
    const members = req.user._id;

})

const postAssignment = asyncHandler(async (req, res) => {

    const { title,description,dueDate} = req.body;

    if (
        [title, description,dueDate].some((field) =>
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
        $push: {     } 
    },
     { new: true }
    ).select("-members")

    return res
        .status(200)
        .json(
            new ApiResponse(200, classroom, "File uploaded successfully")
        )
})

export { createClass,joinClass,postAssignment }