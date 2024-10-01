import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { Exercise, User } from './load-db.js';

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_ID = '66f1f7f98aa02ec58307ebc1';

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

// Get all of a user's selected exercises (should probably have userId as param)
app.get('/user', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const userExercises = await User.findById(ADMIN_ID);
    const translatedExercises = [];
    for (let e of userExercises.selected) {
        translatedExercises.push(await Exercise.findById(e, 'name'));
    }
    res.send(translatedExercises);
    console.log('GET /user - Returned all selected exercises');
});

// Need endpoint to add clicked-on exercise to user -- parameters are user and exercise.
// Get specific exercise (on exercise clicked)
app.post('/user/exercise/:id', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const { id } = req.params;
    const user = await User.findById(ADMIN_ID); // will later need to pass in user id
    if (user.selected.includes(id)) {
        user.selected = user.selected.filter((item) => item != id);
        await user.save();
        res.send(false);
    } else {
        user.selected.push(id);
        await user.save();
        res.send(true);
    }
    console.log('POST /user/exercise/:id - Edited user exercises');
});

// Delete all data in database (dev only)
app.get('/empty', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    await Exercise.deleteMany();
    res.send('Database emptied');

    await mongoose.disconnect(); // needed?
});
