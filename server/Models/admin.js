const mongoose = require('mongoose')
//create User schema
const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required, but missed'],
        minLength:3,
        maxLength:10
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    email:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    }
})

//create Model(class) for the userSchema
const Admin=mongoose.model('admin',adminSchema)

//export User model
module.exports=Admin;