import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { Exercise, User } from './load-db.js';

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_ID = '67031427487d8887d9b8a10e';

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
    console.log('GET /exercises - Returned all exercises');
});

// Return details about one single exercise
app.get('/exercise/:id', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const { id } = req.params;
    const exercise = await Exercise.findById(id);
    res.send(exercise);
    console.log('GET /exercise/:id - Returned specific exercise');
});

// Get all users
app.get('/users', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const users = await User.find();
    res.send(users);
    console.log('GET /users - Returned all users');
})

// Get all of a user's selected exercises
// Should technically be /user/:id/exercises but will get to that later
app.get('/user/exercises', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const userExercises = await User.findById(ADMIN_ID);
    if (!userExercises) {
        res.send(null);
        return;
    }
    const translatedExercises = [];
    for (let e of userExercises.selected) {
        translatedExercises.push(await Exercise.findById(e));
    }
    res.send(translatedExercises);
    console.log('GET /user - Returned all selected exercises');
});

// Add/remove specific exercise from user's selected exercise list
// Should be /user/:userId/exercise/:exerciseId but not yet
app.post('/user/exercise/:id', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const { id } = req.params;
    const user = await User.findById(ADMIN_ID); // will later need to pass in user id

    // Check if exercise is already in list - if so, remove from list. If not, add it.
    const exerciseInList = user.selected.includes(id);
    if (exerciseInList) {
        user.selected = user.selected.filter((item) => item != id);
    } else {
        user.selected.push(id);
    }
    await user.save();

    res.send(exerciseInList);
    console.log('POST /user/exercise/:id - Edited user exercises');
});

// Delete all data in database (dev only)
app.get('/empty', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    await Exercise.deleteMany();
    await User.deleteMany();
    res.send('Database emptied');

    await mongoose.disconnect(); // needed?
});
