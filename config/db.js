const mongoose = require('mongoose');
const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log(`Connected DB:${conn.connection.host}`)
        let listOfCollections = Object.keys(mongoose.connection.collections);
        console.log(listOfCollections)
    })
    .catch((error)=>{
        console.log(error.message);
        process.exit(1)
    })
}

module.exports = connectToDB;