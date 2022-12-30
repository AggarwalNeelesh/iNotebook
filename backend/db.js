const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";
mongoose.set("strictQuery", false);
const connectToMongo =() => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;
//mongodb://localhost:27017
//mongodb://localhost27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false