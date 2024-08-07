const mongoose = require('mongoose')
const URI = process.env.MONGODB_URL;

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(URI, {


        })

        console.log(`MongoDB Connected ${conn.connection.host}`)

    } catch (error) {

        console.log(`Error occured while connecting to DB ${error.message}`)
        process.exit();
    }
}

module.exports = connectDB;

