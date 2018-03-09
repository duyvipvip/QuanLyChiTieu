var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var savingSchema = new mongoose.Schema(
    {
        namesaving: {
            type: String,
        },
        userid: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        walletid: {
            type: String,
        },
        moneyend: {
            type: Number,
        },
        enddate: {
            type: Date,
        },
        image: {
            type: String,
        }
    }
);
var saving = mongoose.model('saving', savingSchema);
module.exports = saving;