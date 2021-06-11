const asyncHandler = require('../middleware/async');
const PostCategory = require('../models/postCategory.model');
const ErrorResponse = require("../utils/errorResponse");
const PostModel = require('../models/post.model');
const { upload } = require('./media.store');
const cloudinary = require("cloudinary");
const path = require('path');






cloudinary.config({
    cloud_name: 'jubel',
    api_key: '394513677318352',
    api_secret: 'EfBk3Lz_X28ifXOvO3txvtc1Rp8'

});

const createPost = asyncHandler(async (req, res, next) =>{
    try{
        let {
            amount,
            description,
            breed,
            verificationCenter,
            item,
            servicesType,
            age
        }= req.body;
        console.log("plsssssssssssssss", amount)

        let cloudIMG = await cloudinary.v2.uploader.upload(req.file.path,function(err,res){
            if (err) {
                console.log('this is the error',err)
            } else {
                console.log('this is the secure_url',res.secure_url)}
                let image = res.secure_url;
                return image
            });
        let imageURL = cloudIMG.secure_url;
        console.log("finish work", imageURL)
        let newPostCat = new PostModel({
            imageURL,
            amount,
            description,
            breed,
            verificationCenter,
            item,
            servicesType,
            age
        })
        newPostCat.save();
        res.status(200).json({
            success:true,
            message:"Post category created successfully",
            data:newPostCat
        })
    }catch(error){
        return next(error)
    }
})

const getAllPost = asyncHandler(async (req, res, next) =>{
    try{
        let postCat = await PostCategoryModel.find();
        res.status(200).json({
            success:true,
            message:"Post categories fetch successfully",
            data:postCat
        })
    }catch(error){
        return next(new ErrorResponse("Unable to fetch post categories", 400));
    }
})

const getSinglePost = asyncHandler(async(req, res, next) =>{
    try{
        let catId = req.query.catId;
        let postCat = await PostModel.findById(catId);
        res.status(200).json({
            success:true,
            message:"Post category fetch successfully",
            data: postCat
        })
    }catch(error){
        return next(new ErrorResponse("Unable to fetch post category", 400));
    }
})

const deletePost = asyncHandler(async(req, res, next) =>{
    try{
        let catId = req.query.catId;
        let postCat = await PostModel.findById(catId)
        postCat.remove();
        res.status(200).json({
            success: true,
            message:"Post category deleted successfully",
            data:null
        })
    }catch(error){
        return next(new ErrorResponse("Unable to delete post category", 400));
    }
})

const editPost = asyncHandler(async(req, res, next) =>{
    try{
        let catId = req.query.catId;
        let name = req.body.name
        let postCat = await PostModel.findByIdAndUpdate(
            catId,
            name,
        );
        res.status(200).json({
            success: true,
            message:"Post category updated successfully",
            data:postCat
        })
    }catch(error){
        return next(new ErrorResponse("Unable to update post category", 400));
    }
})

module.exports = {
    createPost,
    getAllPost,
    getSinglePost,
    deletePost,
    editPost
}