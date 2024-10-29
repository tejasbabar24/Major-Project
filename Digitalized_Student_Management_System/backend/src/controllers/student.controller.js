import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { Student } from "../models/student.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken";

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await Student.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong While Generating Access ANd Refresh Token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, role, email, password } = req.body;

    if (
        [username, role, email, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await Student.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    ;

    let photoLocalPath;
    if (req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
        photoLocalPath = req.files.photo[0].path;
    }

    console.log(photoLocalPath);

    if (!photoLocalPath) {
        throw new ApiError(400, " Image file is required");
    }
    const photo = await uploadOnCloudinary(photoLocalPath);

    if (!photo) {
        throw new ApiError(400, "Image file is required")
    }

    const user = await Student.create({
        username: username.toLowerCase(),
        role,
        email,
        password,
        photo: photo.url
    })

    const createdUser = await Student.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully!!!")
    )


})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!(username )) {
        throw new ApiError(400, "Username Or Email Is Required");
    }

    const user = await Student.findOne({
        $or: [{ username }, { email:username }]
    })

    if (!user) {
        throw new ApiError(404, "User Does Not Exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await Student.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User LoggedIn Successfully")
        )

})

const logOutUser = asyncHandler(async (req, res) => {
    await Student.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )


    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User LoggedOut Sccessfully"));
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {

        const decodedTOken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await Student.findById(decodedTOken?._id);

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token Is Expired Or Used");
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", newRefreshToken)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access Token Refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body

    if (!(newPassword === confirmPassword)) {
        throw new ApiError(401, "New Password And Confirm Password Should Match");
    }

    const user = await Student.findById(req.user?._id);

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Password");
    }

    if (newPassword === oldPassword) {
        throw new ApiError(401, "New Password Should Not Be Same");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Password Has Changed Successfully")
        )

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "Current User Fetched Successfully"));
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username, email } = req.body;

    if (!(username || email)) {
        throw new ApiError("All Fields Are Required");
    }

    const user = await Student.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account Has Been Updated Successfully"));

})

const setProfilePhoto = asyncHandler(async (req, res) => {
    const profileLocalPath = req.file?.path;

    if (!profileLocalPath) {
        throw new ApiError(401, "Profile Is Missing");
    }

    const profile = await uploadOnCloudinary(profileLocalPath);

    if (!profile) {
        throw new ApiError("Error While Uploading Profile");
    }

    const user = await Student.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                profile: profile.url
            }
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Profile Image Uploaded Successfully")
        );

})


export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    setProfilePhoto
}
