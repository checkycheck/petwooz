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
            age,
            postCategory
        }= req.body;
        let user = req.user.id;
        let cloudIMG = await cloudinary.v2.uploader.upload(req.file.path,function(err,res){
            if (err) {
                console.log('this is the error',err)
                return next({})
            } else {
                console.log('this is the secure_url',res.secure_url)}
                let image = res.secure_url;
                return image
            });
        let imageURL = cloudIMG.secure_url;
        let newPostCat = new PostModel({
            imageURL,
            amount,
            description,
            breed,
            verificationCenter,
            item,
            servicesType,
            age,
            user,
            postCategory
        })
        newPostCat.save();
        res.status(200).json({
            success:true,
            message:"Post created successfully",
            data:newPostCat
        })
    }catch(error){
        return next(error)
    }
})

const getAllPost = asyncHandler(async (req, res, next) =>{
    try{
        let postCat = await PostModel.find()
                        .populate("user", ["fullName", "address", ])
        res.status(200).json({
            success:true,
            message:"Post fetch successfully",
            data:postCat
        })
    }catch(error){
        return next(new ErrorResponse("Unable to fetch post", 400));
    }
})

const getSinglePost = asyncHandler(async(req, res, next) =>{
    try{
        let postId = req.query.postId;
        let postCat = await PostModel.findById(postId);
        res.status(200).json({
            success:true,
            message:"Post fetch successfully",
            data: postCat
        })
    }catch(error){
        return next(new ErrorResponse("Unable to fetch post", 400));
    }
})

const deletePost = asyncHandler(async(req, res, next) =>{
    try{
        let catId = req.query.catId;
        let postCat = await PostModel.findById(catId)
        postCat.remove();
        res.status(200).json({
            success: true,
            message:"Post deleted successfully",
            data:null
        })
    }catch(error){
        return next(new ErrorResponse("Unable to delete post", 400));
    }
})

const editPost = asyncHandler(async(req, res, next) =>{
    try{
        const testimonyFields = {};
        if(req.body.testimonyBody) testimonyFields.testimonyBody = req.body.testimonyBody;
        if(req.body.imageUrl) testimonyFields.imageUrl = req.body.imageUrl;
        if(req.body.videoUrl) testimonyFields.videoUrl = req.body.videoUrl;
    
         await Testimony.findByIdAndUpdate( 
            { _id: id }, 
            { $set: testimonyFields },
            { new: true }
         )





        res.status(200).json({
            success: true,
            message:"Post updated successfully",
            data:postCat
        })
    }catch(error){
        return next(new ErrorResponse("Unable to update post", 400));
    }
})

const getPostByCategory = asyncHandler(async(req, res, next) =>{
    try{
        let catId = req.query.catId;
        console.log("this is post",catId)
        let post  = await PostModel.find({postCategory:catId});
        console.log("this is post",post)
        res.status(200).json({
            success:true,
            message:"post fetch successfully",
            data:post
        })
    }catch(error){
        return next(new ErrorResponse("Unable to get post", 400));
    }
})

module.exports = {
    createPost,
    getAllPost,
    getSinglePost,
    deletePost,
    editPost,
    getPostByCategory
}