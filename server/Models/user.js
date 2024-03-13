const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('user', userSchema);

module.exports = User;