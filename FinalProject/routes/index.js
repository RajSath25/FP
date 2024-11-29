var express = require('express');
var router = express.Router();
const passport = require("passport");
let DB = require("../config/db")
let userModel = require("../model/userModel")
let User = userModel.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", {title: "Home"});
});

router.get('/home', function(req, res, next) {
  res.render("index", {title: "Home"});
});

router.get("/login", function(req,res,next){
  if (!req.user)
  {
    res.render("Authentication/login", {
      title:"Login",
      message: req.flash("loginMessage"),
      displayName:req.user ? req.user.displayName:""
    })
  }
  else {
    return res.redirect("/")
  }
})

router.post("/login", function(req,res,next){
  passport.authenticate("local", (err,user,info)=>{
    if (err)
    {
      return next(err)
    }
    if (!user)
    {
      req.flash("loginMessage", "Authentication Error");
      res.redirect("/login")
    }
    req.login(user, (err)=>{
      if (err)
      {
        return next(err)
      }
      return res.redirect("/cipher")
    })
  }) (req,res,next)
})

router.get("/logout", (req,res,next)=>{
  req.logout(function(err){
    if (err)
    {
      return next(err)
    }
  })
  res.redirect("/");
})
module.exports = router;
