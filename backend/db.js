const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
mongoose.set("strictQuery", false);
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfuly")
    })
}
module.exports = connectToMongo;
//mongodb://localhost:27017
//mongodb://localhost27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false