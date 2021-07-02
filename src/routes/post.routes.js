const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { editPostCategory } = require('../stores/post.store');
const { multerUploads } = require('../middleware/multer');
const multer = require('multer');

//==========================================================  set up multer============================
var storage = multer.diskStorage({
    
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now());
    }
});

var upload = multer({ storage: storage })



router
    .post('/create', upload.single('picture'), postController.createPost)
    .get('/get-all', postController.getAllPost)
    .get('/get-single', postController.getSinglePost)
    .delete('/delete', postController.deletePost)
    .put('/update', postController.editPost)
    .get('/get-post-by-category', postController.getPostByCategory)
    .get('/get-user-post', postController.getPostByUser);

module.exports = router;