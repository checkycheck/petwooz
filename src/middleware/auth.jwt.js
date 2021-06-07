const passport = require('passport');
require('../config/passport.config')
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const asyncHandler = require("./async.js");
const ErrorResponse = require("../utils/errorResponse.js");

const isAuthenticated = asyncHandler(async(req,res,next) =>
{
    passport.authenticate('jwt', {session: false},(err, user, info) => {
            if(err || !user) {
                return next(new ErrorResponse("Unauthorized access", 401))
            }else{
                return next(); // continue to next middleware if no error.
            }

        }
    )(req,res,next)
})
const verifyToken = asyncHandler(async (req, res, next) => {
    //Get token from headers
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return next(new ErrorResponse("Unauthorized access", 403));
    }
    //verify and decode token
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return next(new ErrorResponse("Unauthorized access", 401));
      }
      //store decoded token in request
      req.user = decoded.user;
  
      next();
    });
  });

module.exports = {
    isAuthenticated:isAuthenticated,
    verifyToken
}
