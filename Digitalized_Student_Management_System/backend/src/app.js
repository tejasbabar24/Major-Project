import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.set("trust proxy",1);
//routes import do not change
import teacherRouter from "./routes/teacher.routes.js";
import studentRouter from "./routes/student.routes.js";
import classroomRouter from "./routes/classroom.routes.js";

//routes declaration
app.use("/faculty", teacherRouter)
app.use("/student", studentRouter)
app.use("/class", classroomRouter)

export { app }