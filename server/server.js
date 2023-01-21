import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routesHandler from "./routes/handler.js"
import * as dotenv from 'dotenv'

const app = express();
dotenv.config();

const uri = process.env.MONGO_DB_URI;

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler)

app.listen(5000, () => { 
    console.log("Server started on port 5000.");
});
