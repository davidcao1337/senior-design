var express = require("express");

var router = express.Router();


router.get("/", function(req, res) {
    // console.log("hello I'm on the start page");
res.render("pages/");
});


router.get("/fitness", function(req, res){
    res.render("pages/fitness");
});

router.get("/nutrition", function(req, res){
    res.render("pages/nutrition");
});

router.get("/sleep", function(req, res){
    res.render("pages/sleep");
});


module.exports = router;