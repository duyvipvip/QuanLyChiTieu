const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    use: {
        type: Boolean,
        default: false
    },
    savings:[{
        namesaving: {
            type: String,
        },
        moneynow:{
            type: Number,
            default: 0            
        },
        moneyend: {
            type: Number,
        },
        enddate:{
            type: Date,
        },
        transaction:[
            {
                notetransaction: String,
                moneytransaction: Number,
                datetransaction: {
                    type: Date,
                    default: new Date
                },
                idwallet: {
                    type: String,
                },
                detecttransaction: String
            }
        ],
       
    }],
}, { collection: 'user'});
module.exports = mongoose.model('user', userSchema);