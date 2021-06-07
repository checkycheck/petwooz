const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");


const checkDuplicateEmail = asyncHandler(async(req, res, next) => {
  
  const user = await User.findOne({email: req.body.email});

    if(user){
        return next(new ErrorResponse("Email already in use", 400))
    }

    next();  
});


const checkDuplicatePhone = asyncHandler(async(req, res, next) => {
    
    const user = await User.findOne({phone: req.body.phone});
  
      if(user){
          return next(new ErrorResponse("Phone number already in use", 400))
      }
  
      next();  
  });


  const checkDuplicateUsername = asyncHandler(async(req, res, next) => {
    
    const user = await User.findOne({username: req.body.username});
  
      if(user){
          return next(new ErrorResponse("Username already in use", 400))
      }
  
      next();  
  });

const verify = {
    checkDuplicateEmail,
    checkDuplicatePhone,
    checkDuplicateUsername
};

module.exports = verify;