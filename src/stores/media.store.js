const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const sharp = require("sharp");
const { uploadMedia } = require("../services/service.cloudinary");


const upload = asyncHandler(async(req) => {
    const url = {};
    //resize images
    // console.log("this is request =====>>>",req)
    let cover = req.files['file'];
    if(!cover){
        throw new ErrorResponse("no file sent", 403)
    }
    if(req.body.type === "image"){
        const thumbnail_buffer =  await sharp(cover[0].buffer)
        .resize(80, 80)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer();

        const cover_image_buffer =  await sharp(cover[0].buffer)
          .resize(720, 720)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toBuffer();

        cover[0].buffer = cover_image_buffer;
        req.files.thumbnail = [{
        originalname: `thumbnail-${cover[0].originalname}`,
        buffer: thumbnail_buffer,
        mimetype: cover[0].mimetype
        }]
    }

    //upload media to cloudinary
    for(const file in req.files){
    const response = await uploadMedia(req.files[file][0]);
    console.log("response", response)
    const updatedURL = response.url.replace(/^http:\/\//i, 'https://');
    url[`${file}_link`] = updatedURL
    }

    return url;
})

module.exports = {
    upload
}