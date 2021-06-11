const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv').config();
const shortid = require('shortid');
const moment = require('moment');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const register = asyncHandler(async(req, res, next) => {
    const { fullName, password, phone, userType, email, address, country, state } = req.body;
    const data = {};

    data.fullName = fullName.charAt(0).toUpperCase() + fullName.slice(1);
    data.password = bcrypt.hashSync(password, 10);
    data.phone = phone;
    data.userType = userType;
    data.address = address;
    data.country = country;
    data.state = state;
    data.email = email;

    const user = new User(data);

    await user.save()
    .then(() => {
        
        res.status(200).send({
            success: true, 
            message: `Registration successful.`
        })
    }).catch(err => next(err))
    
})

const login = asyncHandler(async(req, res, next) => {

    const { id, password } = req.body;
    const user = await User.findOne({
        $or: [{email: id}, {phone: id}]
    });
    //check if user exists
    if(!user){
        return next(new ErrorResponse("Invalid phone number/email", 400));
    }
    //check if password is valid
    const validate = await bcrypt.compareSync(password, user.password);
    if(!validate){
        return next(new ErrorResponse("Invalid password", 400));
    }


    const userJwt = { id: user.id, email: user.email};
    let expire = 2592000;
    let token = await jwt.sign(userJwt, process.env.SECRET, {expiresIn: expire });

    return res.status(200).send({
        success: true,
        message: "login successful",
        data: user,
        authorization: {
            token,
            expiresIn: expire
        }
    });
})


module.exports = {
    register,
    login
}