import mongoose,{Schema} from "mongoose";

const joinclassSchema=new Schema({
    classId:{
        type:String,
        index:true,
    },
    classCode:{
        type:String,
        index:true
    }
},{timestamps:true})


export const JoinClass=mongoose.model("JoinClass",joinclassSchema);