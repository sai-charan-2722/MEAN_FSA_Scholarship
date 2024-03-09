const cloudinary = require('cloudinary').v2
const multer = require('multer')
const cloudinaryStorage = require('cloudinary-multer')

require('dotenv').config()

const fs = require('fs');
const path = require('path');

if(!fs.existsSync("./uploads")){
    fs.mkdirSync("./uploads");
}

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const storage = cloudinaryStorage({
    cloudinary: cloudinary
})

const localStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({storage:localStorage})

module.exports={upload,cloudinary}