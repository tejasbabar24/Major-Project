import { Router } from "express";
import{
    createClass,
    joinClass,
    postAssignment
} from "../controllers/classroom.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();

router.route('/create-class').post(createClass);

router.route('/post-assignment').patch()

