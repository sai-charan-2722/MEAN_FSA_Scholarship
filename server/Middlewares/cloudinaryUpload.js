const cloudinary = require('cloudinary').v2
const multer = require('multer')
const cloudinaryStorage = require('cloudinary-multer')

require('dotenv').config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
})

const upload = multer({storage:storage})

module.exports={upload,cloudinary}