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

module.exports = router;
