import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routesHandler from "./routes/handler.js"
import userHandler from "./routes/userHandler.js"
import goalsHandler from "./routes/goalsHandler.js"
import sleepHandler from "./routes/sleepHandler.js"
import exerciseHandler from "./routes/exerciseHandler.js"
import foodItemHandler from "./routes/foodItemHandler.js"
import dotenv from "dotenv"

// Configurations
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.json());

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

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Handlers
app.use('/', routesHandler);
app.use('/user', userHandler);
app.use("/goals", goalsHandler);
app.use('/sleep', sleepHandler);
app.use('/exercise', exerciseHandler);
app.use('/nutrition', foodItemHandler);

// Server Start
const PORT = process.env.PORT || 5000 // Ensure that port number of proxy matches in client/package.json

app.listen(PORT, () => { 
    console.log("Server started on port", PORT);
});
