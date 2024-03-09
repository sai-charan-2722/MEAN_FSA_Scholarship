const exp = require("express");
const applicationApp = exp.Router();
const {upload} = require("../Middlewares/cloudinaryUpload")

const expressAsyncHandler = require("express-async-handler");
const verifyToken=require('../Middlewares/verifyToken')


const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
} = require("../Controllers/application-controller");

applicationApp.get("/applications", verifyToken, expressAsyncHandler(getAllApplications));

applicationApp.get("/applications/:id", verifyToken, expressAsyncHandler(getApplicationById));

applicationApp.post("/application", verifyToken,upload.single('image'), expressAsyncHandler(createApplication));

applicationApp.put("/application/:id", verifyToken, expressAsyncHandler(updateApplication));

applicationApp.delete("/application/:id", verifyToken, expressAsyncHandler(deleteApplication));


module.exports = applicationApp;