const AcccountStore = require('../stores/account.store');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Validator = require("../validators/validators.index");


const register = asyncHandler(async(req, res, next) => {
    //Validate request body parameters
    const { error } = await Validator.register.validateAsync(req.body)
    if(error){
        return next(new ErrorResponse(error.message, 400));
    }else{
        await AcccountStore.register(req, res, next);
    }
})

const login = asyncHandler(async(req, res, next) => {
    const { error } = await Validator.login.validateAsync(req.body)
    if(error){
        return next(new ErrorResponse(error.message, 400));
    }else{
        await AcccountStore.login(req, res, next);
    } 
})


module.exports = {
    register,
    login,
}