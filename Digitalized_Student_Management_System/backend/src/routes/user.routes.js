import { Router } from 'express';
import {
    changeCurrentPassword,
    getCurrentUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    registerUser,
    registerStudentUser,
    setProfilePhoto,
    updateAccountDetails
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);

router.route('/student-register').post(
    upload.fields([
        {
            name: "photo",
            maxCont: 6
        }
    ]),
    registerStudentUser);

router.route('/login').post(loginUser);

router.route('/logout').post(verifyJWT, logOutUser);

router.route('/refresh-token').post(refreshAccessToken);

router.route('/current-user').get(verifyJWT, getCurrentUser);

router.route('/update-account').patch(verifyJWT, updateAccountDetails);

router.route('/profile').patch(verifyJWT, upload.single("profile"), setProfilePhoto);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

export default router;



