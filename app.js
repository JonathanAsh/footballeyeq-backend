import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { Exercise, User } from './load-db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Allow local webserver to connect -- may need to change later for authentication
app.use(express.json());
app.use(cors())

app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});

// Get all exercises (on page load)
app.get('/exercises', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const exercises = await Exercise.find();
    res.send(exercises);
    console.log('GET /exercises: Returned all exercises');

    // await mongoose.disconnect();
});

// Need endpoint to add clicked-on exercise to user -- parameters are user and exercise.


// Delete all data in database (dev only)
app.get('/empty', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    await Exercise.deleteMany();
    res.send('Database emptied');

    await mongoose.disconnect();
});
