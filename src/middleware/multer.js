const multer = require('multer');
const DataUriParser = require('datauri/parser');
const path = require('path');


const storage = multer.memoryStorage();
const parser = new DataUriParser();

const multerUploads = multer({ storage });

const dataUri = file => {
    console.log(file)
    return parser.format(path.extname(file.originalname).toString(), file.buffer);
}



module.exports = { multerUploads, dataUri};