const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


// Allow local webserver to connect -- may need to change later
app.use(express.json());
app.use(cors())

app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});

// Initialised values
const thing = [
    {
        id: 0,
        sel: false,
    },
    {
        id: 1,
        sel: false,
    },
    {
        id: 2,
        sel: false,
    },
    {
        id: 3,
        sel: false,
    },
    {
        id: 4,
        sel: false,
    },
];

// Get all exercises
app.get('/exercises', (req, res) => {
    res.send(thing);
});

// Get exercise by id
app.get('/exercise/:id', (req, res) => {
    const { id } = req.params;

    // Find the object by id
    const answerObj = thing.filter(x => x.id == id)[0];

    // Swap its selected status
    thing[id].sel = !answerObj.sel;

    // Send it back
    res.send(thing[id].sel);
});
