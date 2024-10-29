import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import cors from 'cors'

app.use(cors({
    origin: 'http://localhost:5173'
}));

dotenv.config()

connectDB()
    .then(() => {
        app.listen(8000, () => {
            console.log(`Server is running at :${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED!!", err);
    })




