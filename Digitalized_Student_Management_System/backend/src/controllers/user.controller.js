import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js";


const registerUser = asyncHandler(async (req, res) => {
    const { username, activeItem, email, password } = req.body;

    if (
        [username, role, email, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email por username already exists")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        role: activeItem,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "SOmething went wrong while registring the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully!!!")
    )
})

export { registerUser }
