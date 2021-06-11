const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Validator = require("../validators/validators.index");
const PostStore = require('../stores/post.store');

const createPost = asyncHandler(async(req, res, next) =>{
    PostStore.createPost(req, res, next)
})

const getAllPost = asyncHandler(async(req, res, next) =>{
    PostStore.getAllPost(req, res, next)
})

const getSinglePost = asyncHandler(async(req, res, next) =>{
    PostStore.getSinglePost(req, res, next)
})

const deletePost = asyncHandler(async(req, res, next) =>{
    PostStore.deletePost(req, res, next)
})

const editPost = asyncHandler(async(req, res, next) =>{
    PostStore.editPost(req, res, next)
})

module.exports = {
    createPost,
    getAllPost,
    getSinglePost,
    deletePost,
    editPost
}
