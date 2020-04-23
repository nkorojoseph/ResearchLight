const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
//const mongoClient = require('mongodb').MongoClient

const makeDBConnect = async ()=>{

    try {
        await mongoose.connect(db,
            {
                useNewUrlParser:true,
                useUnifiedTopology: true,
                useCreateIndex:true,
                useFindAndModify: false
            })
            console.log("DB connected")
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = makeDBConnect