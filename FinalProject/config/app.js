let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


//MongoDB
let mongoose = require("mongoose");
let DB = require("./db");


mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection error: "));
mongoDB.once("open", ()=>{
  console.log("Connected to MongoDB")
});

mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true})

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let cipherRouter = require("../routes/cipher");
let registerRouter = require('../routes/register')

let app = express();
let cors = require("cors");
let UserModel = require("../model/userModel");
let User = UserModel.User;
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let flash = require("connect-flash");
const { parseArgs } = require('util');
passport.use(User.createStrategy());
let localStrategy = passportLocal.Strategy;

app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));

app.use(flash())

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/cipher", cipherRouter);
app.use('/register', registerRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: "Error"
  });
});

module.exports = app;
