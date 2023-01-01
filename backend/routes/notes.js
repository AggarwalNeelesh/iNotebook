const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

///////////////////////// Route 1 /////////////////////////////
// Fetch All Notes using GET "/api/notes/fetchallnotes" Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

///////////////////////// Route 2 /////////////////////////////
// Add a new Note using POST "/api/notes/addnote" Login required

router.post(
  "/addnote",
  fetchuser,
  [
    // Array
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 10 Characters").isLength({
      min: 10,
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Destructuring elements from request body
        const {title, description, tag} = req.body;
        // Creating Note
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        // Saving note in database
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
  }
);

///////////////////////// Route 1 /////////////////////////////
// Update an existing Note using PUT "/api/notes/updatenote" Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        // Destructuring elements from request body
        const {title, description, tag} = req.body;
        // Creating Note
        const newNote = {};
        if(title)newNote.title = title;
        if(description)newNote.description = description;
        if(tag)newNote.tag = tag;
        // Find the Note to be updated and update it
        let note = await Notes.findById(req.params.id);

        // note Not found 
        if(!note)return res.status(404).send("Not Found")

        // If a user tries to update note of another user.
        if(note.user.toString() !== req.user.id)return res.status(401).send("Access Denied !");

        // Updating note in database
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

module.exports = router;
