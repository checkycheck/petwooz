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
                return next(new ErrorResponse("Unauthorized access", err, 401))
            }else{
                return next(); // continue to next middleware if no error.
            }

        }
    )(req,res,next)
})

module.exports = {
    isAuthenticated:isAuthenticated,
}
