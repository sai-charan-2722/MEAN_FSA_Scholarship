const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    mname: { type: String },
    lname: { type: String, required: true },
    father: { type: String, required: true },
    mother: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    mblno: { type: String, required: true },
    gender: { type: String, required: true },
    imageUrl: { type: String, required: true },
    collegename: { type: String, required: true },
    year: { type: String, required: true },
    grade: { type: String, required: true },
    caste: { type: String, required: true },
    annualincome: { type: String, required: true },
    status: { type: String }
});

const Application = mongoose.model('application', applicationSchema);

module.exports = Application;