const asyncHandler = require('../middleware/async');
const PostCategory = require('../models/postCategory.model');
const ErrorResponse = require("../utils/errorResponse");
const PostCategoryModel = require('../models/postCategory.model');

const createPostCategory = asyncHandler(async (req, res, next) =>{
    try{
        let name = req.body.name;
        let newPostCat = new PostCategoryModel({
            name
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

const getAllPostCategory = asyncHandler(async (req, res, next) =>{
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

const getSinglePostCategory = asyncHandler(async(req, res, next) =>{
    try{
        let catId = req.query.catId;
        let postCat = await PostCategoryModel.findById(catId);
        res.status(200).json({
            success:true,
            message:"Post category fetch successfully",
            data: postCat
        })
    }catch(error){
        return next(new ErrorResponse("Unable to fetch post category", 400));
    }
})

const deletePostCategory = asyncHandler(async(req, res, next) =>{
    try{
        let catId = req.query.catId;
        let postCat = await PostCategoryModel.findById(catId)
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

const editPostCategory = asyncHandler(async(req, res, next) =>{
    try{
        let catId = req.query.catId;
        let name = req.body.name
        let postCat = await PostCategoryModel.findByIdAndUpdate(
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
    createPostCategory,
    getAllPostCategory,
    getSinglePostCategory,
    deletePostCategory,
    editPostCategory
}