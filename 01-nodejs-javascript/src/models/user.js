const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    phone: Number,
    address: String,
    city: String,
    role: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
