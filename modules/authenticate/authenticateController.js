"use strict";
const User = require("../authenticate/authenticateModel").model;
const fillData = require("../authenticate/authenticateModel").fillData;
const  utill = require("../../utill.js");
const bcrypt = require('bcrypt');
let generateAccessToken = require('../../accesstoken.js').generateAccessToken;
const signup= (request, response, next) =>{
  let users = {};
  users = request.body;
    User.findOne({ email: users.email.toLowerCase() }, (err, existingemail) => {
        if (err) {
          return next(err);
        }
        if (existingemail) {
          response.json(
            utill.responseErrorJSON(
              401,
              "An account with that email address already exist.",
              "Error"
            )
          );
        } else {
          let filledModel = fillData(users);
          const _model = new User(filledModel);
          if (request.body.hasOwnProperty("password")) {
            let salt = bcrypt.genSaltSync(5);
            let hash = bcrypt.hashSync(users.password, salt);
            _model.password = hash;
          }
        
          _model.save((err, nuser) => {
            if (err) {
              return next(err);
            }
         
            response.json(utill.responseSuccessJSON(200, "user registered succefully",));
          });
        }
      });
    };

    const Signin = (request, response) => {
      console.log(request.body);
      let query = {};

      let pwdError = "Authentication failed. Wrong credentials.";
      let ErrorCotes = "Authentication failed. Wrong credentials.";
      query = { email: request.body.email.toLowerCase() };

      User.findOne(query, (err, user) => {
        if (err) {
          console.log("err", err);
          response.json(utill.responseErrorJSON(401, "error", err));
        }
        if (!user) {
          response.json(utill.responseErrorJSON(401, ErrorCotes, ""));
        } else {
          let isMatch = bcrypt.compareSync(request.body.password, user.password);
          console.log("is match", isMatch);
          if (isMatch) {
            console.log("signin success",);
            const loginuser = {};
            const accessToken = generateAccessToken(loginuser);
            loginuser._id = user._id;
            loginuser.token = accessToken;
            loginuser.Designation = user.Designation;
            loginuser.name = user.name;
            response.json(utill.responseSuccessJSON(200, "success", loginuser));
     
          } else {
            response.json(utill.responseErrorJSON(401, pwdError, ""));
          }
        }
      });
  
    };
  
 

    const getallusers = (request, response) => {
      User.find({}, (err, users) => {
        if (err) {
          response.json(utill.responseErrorJSON(401, "error", err));
        }
        response.json(utill.responseSuccessJSON(200, "success", users));
      });
    };


    const deleteuser = (request, response) => {
      console.log(request.body._id)
      User.deleteOne({ '_id': request.body._id}, (err, users) => {
        if (err) {
          response.json(utill.responseErrorJSON(401, "error", err));
        }
        response.json(utill.responseSuccessJSON(200, "user deleted successfully"));
      });
    };

 
 
   module.exports = {signup,Signin,getallusers,deleteuser};