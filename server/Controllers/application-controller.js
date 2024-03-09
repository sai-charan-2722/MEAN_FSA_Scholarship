const Application = require("../Models/application");
const {cloudinary} = require("../Middlewares/cloudinaryUpload")
const fs = require("fs")

const getAllApplications = async (req,res)=>{
    const applications = await Application.find();
    res.status(200).send({ message: "users", payload: applications });
}

const getApplicationById = async (req,res)=>{
    let id = req.params.id;
    const app = await Application.findById(id);
    res.send({message:"Application found",payload:app})
}

const createApplication = async (req,res)=>{
    let app = JSON.parse(req.body.newApplication)
    
    let existingApp = await Application.findOne({email:app.email});
    if(existingApp !==null){
        return res.status(200).send({message:"Application already existed"})
    }
    let result = await cloudinary.uploader.upload(req.file.path)
    app.imageUrl = result.url;
    app.status = "Pending";

    const newApp = await Application.create(app);

    fs.unlink(req.file.path,err=>{
        if(err){
            throw err
        }
    });
    res.status(200).send({ message: "Application created", payload: newApp });
}

const updateApplication = async (req,res)=>{
    let id = req.params.id
    let updatedApp = await Application.findByIdAndUpdate(id,req.body);
    res.send({message:"Application updated",payload:updatedApp});
}

const deleteApplication = async (req,res)=>{
    let id = req.params.id
    let deletedApp = await Application.findByIdAndDelete(id);
    res.send({message:"Application deleted",payload:deletedApp});
}

module.exports = {getAllApplications,getApplicationById,createApplication,updateApplication,deleteApplication}