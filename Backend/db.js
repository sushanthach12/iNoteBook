const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
// const mongoURI = "mongodb+srv://rdj77:*****@inotebook.7ih6w.mongodb.net/inotebook?authSource=admin&replicaSet=atlas-305z6c-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connnected to mongo succesfully");
    })
}

module.exports = connectToMongo