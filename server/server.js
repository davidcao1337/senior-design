import express from "express";
import bodyParser from "body-parser";
import routesHandler from "./routes/handler.js"


const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler)

app.listen(5000, () => { 
    console.log("Server started on port 5000.");
});
