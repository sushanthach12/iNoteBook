const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


//Route 1 : Get all the notes using: GET "/api/notes/fetchallnotes" .login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }

})


//Route 2 : Add a new notes using: GET "/api/notes/addnote" .login required

router.post('/addnote', fetchuser, [

    body('tittle', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 chars').isLength({ min: 5 }),

], async (req, res) => {

    //if there are errors, return bad req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { tittle, description, tag } = req.body

        const note = new Note({
            user: req.user.id, tittle, description, tag
        })

        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }
})



//Route 3 : Update an existing note using: PUT "/api/notes/updatenote" .login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { tittle, description, tag } = req.body;

    try {
        // Create a newNote object
        const newNote = {};

        if (tittle) { newNote.tittle = tittle };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


//Route 4 : Delete an existing note using: DELETE "/api/notes/deletenote" .login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // const { tittle, description, tag } = req.body;

    try {
        //Find the note to be Deleted and delete it
        let success = false;

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found!!")
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!!")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        success = true;
        res.json({ "Success ": success, note: note })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }
})

module.exports = router; 