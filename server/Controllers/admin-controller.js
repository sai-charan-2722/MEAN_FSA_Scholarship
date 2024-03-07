const Admin = require("../Models/admin");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const getAdmins = async (req, res) => {
    const adminsList = await Admin.find();
    res.status(200).send({ message: "users", payload: adminsList });
};

const getAdminByUsername = async (req,res)=>{
    let username = req.params.username;
    let admin = await Admin.find({username:username})
    if(admin.length!==0){
        res.status(200).send({message:'admin found',payload:admin})
    }else{
        res.send({message:'admin not found'})
    }
};

const createAdmin = async (req, res) => {
    let existingAdmin = await Admin.findOne({ username: req.body.username });
    if (existingAdmin !== null) {
      return res.status(200).send({ message: "Admin already existed" });
    }
    const hashedPassword = await bcryptjs.hash(req.body.password, 6);
    req.body.password = hashedPassword;
    const newAdmin = await Admin.create(req.body);
    res.status(200).send({ message: "Admin created", payload: newAdmin });
};


const loginAdmin = async (req, res) => {
    const adminCredentials = req.body;
    let admin = await Admin.findOne({ username: adminCredentials.username });
    if (admin === null) {
      return res.status(200).send({ message: "Invalid username" });
    }
    
    const result = await bcryptjs.compare(
      adminCredentials.password,
      admin.password
    );

    if (result === false) {
      return res.status(200).send({ message: "Invalid password" });
    }

    const signedToken = jwt.sign(
      { username: admin.username },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    res.status(200).send({ message: "login success", token: signedToken, user: admin });
};

const updateAdmin = async (req, res) => {
    let admin = await Admin.findOneAndUpdate({ username: req.body.username },req.body);
    if(admin===null){
        return res.send({message:"Admin not found"})
    }
    res.status(200).send({ message: "Admin modified", payload: admin });
};

const removeAdmin = async (req,res)=>{
    let username = req.params.username
    let deletedAdmin = await Admin.findOneAndDelete({username:username})
    if(deletedAdmin===null){
        res.send({message:"Admin not found"})
    }
    res.send({message:'Admin deleted',payload:deletedAdmin})
};
  

  
module.exports = {getAdmins,getAdminByUsername,createAdmin,updateAdmin,removeAdmin,loginAdmin}