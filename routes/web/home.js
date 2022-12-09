var express = require("express");

var router = express.Router();


router.get("/", function(req, res) {
    // console.log("hello I'm on the start page");
res.render("pages/");
});
 
router.get("/home", function(req,res){
    res.render("pages/home");
});

router.get("/about", function(req, res){
    res.render("pages/about");
});


module.exports = router;