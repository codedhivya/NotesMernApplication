
import dotenv from 'dotenv'

import express from 'express'
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import noteRouter from './routes/notesRouter.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the URL of the current module to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = path.dirname(__filename);
const app = express();

//connectDB();
dotenv.config();
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


