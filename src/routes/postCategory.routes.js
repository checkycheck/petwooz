const express = require('express');
const router = express.Router();
const postCategoryController = require('../controllers/postCategory.controller');
const { editPostCategory } = require('../stores/postCategory.store');

router
    .post('/create', postCategoryController.createPostCategory)
    .get('/get-all', postCategoryController.getAllPostCategory)
    .get('/get-single', postCategoryController.getSinglePostCategory)
    .delete('/delete', postCategoryController.deletePostCategory)
    .put('/update', postCategoryController.editPostCategory);

module.exports = router;