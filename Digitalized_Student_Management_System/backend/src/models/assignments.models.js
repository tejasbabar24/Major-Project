import mongoose,{Schema} from "mongoose";

const assignmentSchema=new Schema({
    title:{
        type:String,
        required:true
    },   
    description:{
        type:String
    },
    duedate:{
        type:Date
    },
    file:{
        type:String,
        required:true
    },
},{timestamps:true})


export const Assignment=mongoose.Model("Assignment",assignmentSchema)