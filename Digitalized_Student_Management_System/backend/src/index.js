import {config} from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import cors from 'cors'

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

config({path:"./.env"})

connectDB()
    .then(() => {
        app.listen(8000, () => {
        })
    })
    .catch((err) => {
    })




