
const { dataUri} = require('../middleware/multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { uploader, cloudinaryConfig } = require('../config/cloudinary.config');
const asyncHandler = require('../middleware/async');

const imageFileFilter =  (file) => (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg");
const videoFileFilter =  (file) => (file.mimetype === "video/mpeg" || file.mimetype === "video/avi" || file.mimetype === "video/flv"); 

const uploadMedia = asyncHandler(async(file)=>{
    const type = file.mimetype.split('/');
    console.log("this is type", type)
    if(type[0] === "image"){
        return uploadImageSingle(file)
    }else{
        return uploadOtherSingle(file)
    }
})

const uploadImageSingle = asyncHandler(async(req) => {
    const file = dataUri(req).content;
    console.log("--reached 1--", cloudinaryConfig)
    const result = await cloudinaryConfig.upload(file, {public_id:`images/${req.originalname}`})
    //const ext = path.extname(req.file.originalname).toString();
    return result;
})

const uploadOtherSingle = asyncHandler(async(req) => {
    const type = req.mimetype.split('/');
    let folder = 'documents';
    
    if(type[0] === "video"){
        folder = "videos"
    }
    if(type[0] === "audio"){
        folder = "audio"
    }

    const file = dataUri(req).content;
    console.log("--reached 2--")
    const result = await uploader.upload(file, {
        resource_type: "video", 
        public_id: `${folder}/${req.originalname}`,
        chunk_size: 6000000,
    })
    //const ext = path.extname(req.file.originalname).toString();
    return result;
})


module.exports = {
    uploadMedia
}