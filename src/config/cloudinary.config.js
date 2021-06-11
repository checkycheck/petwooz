// const env = require('dotenv').config()
require("dotenv").config();
const { config, uploader } = require('cloudinary').v2;


const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: 'jubel',
        api_key: '394513677318352',
        api_secret: 'EfBk3Lz_X28ifXOvO3txvtc1Rp8'
});
next();
}


module.exports = { cloudinaryConfig, uploader };