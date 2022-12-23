import express from "express";
const router = express.Router();

router.get('/dashboard', (req, res) => {
    const str = [{
        "name": "Jane Doe",
        "msg": "Hello there!"
    }];
    res.end(JSON.stringify(str))
});

export default router
