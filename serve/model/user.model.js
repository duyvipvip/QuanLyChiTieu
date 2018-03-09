const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    hinhanh: {
        type: String,
        default: "imageuser.png"
    },
    kichhoat: {
        type: String,
        default: 'flase'
    }
}, { collection: 'users'});
module.exports = mongoose.model('users', userSchema);