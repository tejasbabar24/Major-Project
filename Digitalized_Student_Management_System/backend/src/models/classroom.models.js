import mongoose, { Schema } from "mongoose";

const classroomSchema = new Schema({
    classname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    section: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
    },
    subject: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
    },
    year: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    // assignment:[
    //     {
    //         title: { type: String, required: true },
    //         description: String,
    //         dueDate: Date,
    //         file:String,
    //         timestamps:true
    //     }
    // ]
}, { timestamps: true });

export const Classroom = mongoose.model("Classroom", classroomSchema);
