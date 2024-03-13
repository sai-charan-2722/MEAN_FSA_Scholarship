const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required, but missed'],
        minLength: 3,
        maxLength: 12
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;