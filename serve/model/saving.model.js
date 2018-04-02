var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var savingSchema = new mongoose.Schema(
    {
        namesaving: {
            required: true,
            type: String,
        },
        iduser: {
            type: String,
            required: true
        },
        
        moneyend: {
            required: true,
            type: Number,
        },
        enddate: {
            required: true,
            type: Date,
        },
        image: {
            required: true,
            type: String,
        },
        idwallet: {
            type: String,
        },
        status: {
            type: String,
            default: 'false'
        },
        idsaving:{
            type: String,
        }
    }
);
var saving = mongoose.model('saving', savingSchema);
module.exports = saving;