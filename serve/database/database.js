const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/quanlychitieu", {useMongoClient: true});
//mongoose.connect('mongodb://havanduy:havanduy@ds261527.mlab.com:61527/wallet', {useMongoClient: true});
