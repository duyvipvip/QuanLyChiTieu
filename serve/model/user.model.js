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
        default: "money123"
    },
    hinhanh: {
        type: String,
        default: "avatar.jpeg"
    },
    cauhoi: {
        type: String,
    },
    kichhoat: {
        type: String,
        default: 'flase'
    }
}, { collection: 'users'});
module.exports = mongoose.model('users', userSchema);