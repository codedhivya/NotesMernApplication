require("dotenv").config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./db.js')
const userRouter = require('./routes/userRouter.js')
const noteRouter = require('./routes/notesRouter.js')
const mongoose = require('mongoose')
const path = require('path')
const fileURLToPath = require("url")
console.log(__filename)
console.log("dirname", __dirname)
const app = express();

//connectDB();
app.use(express.json())
app.use(cors());

app.use('/users', userRouter);
app.use('/api/notes', noteRouter)

//Render client for any path
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
});

// Connecting to MongoDB using Mongoose
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("connected to DB successfully");

        // Listening to requests if DB connection is successful
        app.listen(5000, () => console.log("Listening to port 5000"));
    })
    .catch((err) => console.log(err));


