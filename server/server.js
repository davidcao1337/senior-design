import express from "express";
import bodyParser from "body-parser";

const app = express();

app.get("/api", (req, res) => {
    res.json({ "users": ["user1", "user2", "user3"] })
});

app.listen(5000, () => { console.log("Server started on port 5000") });
