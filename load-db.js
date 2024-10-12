import mongoose from 'mongoose';
import exerciseList from './exercises.js';
import userList from './users.js';

// Exercise Schema (ids are automatically added)
const exerciseSchema = new mongoose.Schema({
    name: String,
    ages: String,
    description: String,
    categories: [String]
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    selected: [mongoose.Schema.Types.ObjectId]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('User', userSchema);

main().catch(err => console.log(err));

// Do we even need this now? This should just be load() I think
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    // await load(); // uncomment this to load all data into database
    // await mongoose.disconnect()
}

async function load() {
    // Load exercises into db (which means only run this once and have stuff elsewhere ig)
    // Since exactly the same, can we combine somehow? Only change is type of document.
    for (const item of exerciseList) {
        const data = new Exercise({
            ...item
        });
        await data.save();
    }

    // Load users into db
    for (const item of userList) {
        const data = new User({
            ...item
        });
        await data.save();
    }

    console.log('Data successfully migrated!');
}

export { Exercise, User };