import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routesHandler from "./routes/handler.js"
import userHandler from "./routes/userHandler.js"
import * as dotenv from 'dotenv'

const app = express();
dotenv.config();

// MongoDB Connection
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

// Handlers
app.use('/', routesHandler);
app.use('/user', userHandler);

app.listen(5000, () => { 
    console.log("Server started on port 5000.");
});
