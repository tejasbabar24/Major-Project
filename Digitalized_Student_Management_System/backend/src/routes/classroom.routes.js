import { Router } from "express";
import {
    createClass,
    joinClass,
    postAssignment
} from "../controllers/classroom.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWt } from "../middlewares/auth.middleware.js";
import { stud_verifyJWt } from "../middlewares/auth_stud.middleware.js";

const router = Router();

router.route('/create-class').post(verifyJWt, createClass);

router.route('/join-class').post(stud_verifyJWt,joinClass);

router.route('/post-assignment').patch()

