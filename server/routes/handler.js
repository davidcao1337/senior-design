import express from "express";

const router = express.Router();

router.get('/dashboard', (req, res) => {
    const str = [{
        "name": "Jane Doe",
        "msg": "Hello there!"
    }];
    res.end(JSON.stringify(str))
});

// router.get('/exercise', (req, res) => {
//     const str = [{
//         "name": "Exercise",
//         "msg": "Time to workout!"
//     }];
//     res.end(JSON.stringify(str))
// });

// router.get('/nutrition', (req, res) => {
//     const str = [{
//         "name": "Nutrition",
//         "msg": "Eating healthy!"
//     }];
//     res.end(JSON.stringify(str))
// });

// router.get('/sleep', (req, res) => {
//     const str = [{
//         "name": "Sleep",
//         "msg": "Well rested!"
//     }];
//     res.end(JSON.stringify(str))
// });

export default router
