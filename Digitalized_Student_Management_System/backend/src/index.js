import {config} from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import cors from 'cors'

app.use(cors({
    origin: "https://academix-ruby.vercel.app"
}));

config({path:"./.env"})

connectDB()
    .then(() => {
        app.listen(8000, () => {
        })
    })
    .catch((err) => {
    })




