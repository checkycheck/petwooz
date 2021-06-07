const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Validator = require("../validators/validators.index");
const PostCategoryStore = require('../stores/postCategory.store');

const createPostCategory = asyncHandler(async(req, res, next) =>{
    PostCategoryStore.createPostCategory(req, res, next)
})

const getAllPostCategory = asyncHandler(async(req, res, next) =>{
    PostCategoryStore.getAllPostCategory(req, res, next)
})

const getSinglePostCategory = asyncHandler(async(req, res, next) =>{
    PostCategoryStore.getSinglePostCategory(req, res, next)
})

const deletePostCategory = asyncHandler(async(req, res, next) =>{
    PostCategoryStore.deletePostCategory(req, res, next)
})

const editPostCategory = asyncHandler(async(req, res, next) =>{
    PostCategoryStore.editPostCategory(req, res, next)
})

module.exports = {
    createPostCategory,
    getAllPostCategory,
    getSinglePostCategory,
    deletePostCategory,
    editPostCategory
}
