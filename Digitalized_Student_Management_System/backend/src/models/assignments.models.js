import mongoose, { Schema } from "mongoose";
import { Classroom } from "./classroom.models";

const assignmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duedate: {
        type: Date
    },
    file: {
        type: String,
        required: true
    },
    classId: {
        type: chema.Types.ObjectId,
        ref: Classroom,
        required: true
    },
    classCode: {
        type: String
    }
}, { timestamps: true })


export const Assignment = mongoose.Model("Assignment", assignmentSchema)