const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/quanlychitieu", {useMongoClient: true});
// mongodb://<dbuser>:<dbpassword>@ds113179.mlab.com:13179/quanlychitieu
mongoose.connect('mongodb://quanlychitieu:quanlychitieu@ds113179.mlab.com:13179/quanlychitieu', {useMongoClient: true});