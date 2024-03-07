const Application = require("../Models/application");

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
    const newApp = await Application.create(req.body);
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