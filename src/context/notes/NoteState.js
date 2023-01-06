import React , { useState }from "react";
import NoteContext from "./noteContext";
// It will hold all the states related to notes.
const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "63b1d32f90e5181d2365f532",
          "user": "63b09af1ff48f4207f885d05",
          "title": "What it is to be like learning alone ?",
          "description": "It is the best way to purify our mind and soul , keeping our productivity at its pinnacle.",
          "tag": "Study Hacks",
          "date": "2023-01-01T18:38:39.798Z",
          "__v": 0
        },
        {
          "_id": "63b1df73cc6c180b13cf6f2",
          "user": "63b09af1ff48f4207f885d05",
          "title": "What it is to be like learning alone ?",
          "description": "It is the best way to purify our mind and soul , keeping our productivity at its pinnacle.",
          "tag": "Study Hacks",
          "date": "2023-01-01T19:30:59.606Z",
          "__v": 0
        },{
            "_id": "63b1d32f90e5181d2365f53",
            "user": "63b09af1ff48f4207f885d05",
            "title": "What it is to be like learning alone ?",
            "description": "It is the best way to purify our mind and soul , keeping our productivity at its pinnacle.",
            "tag": "Study Hacks",
            "date": "2023-01-01T18:38:39.798Z",
            "__v": 0
          },
          {
            "_id": "63bd32f90e5181d2365f53",
            "user": "63b09af1ff48f4207f885d05",
            "title": "What it is to be like learning alone ?",
            "description": "It is the best way to purify our mind and soul , keeping our productivity at its pinnacle.",
            "tag": "Study Hacks",
            "date": "2023-01-01T18:38:39.798Z",
            "__v": 0
          },
          {
            "_id": "63b1d32f90e511d2365f532",
            "user": "63b09af1ff48f4207f885d05",
            "title": "What it is to be like learning alone ?",
            "description": "It is the best way to purify our mind and soul , keeping our productivity at its pinnacle.",
            "tag": "Study Hacks",
            "date": "2023-01-01T18:38:39.798Z",
            "__v": 0
          }
      ];
      const [notes, setNotes] = useState(notesInitial);
      
      // Add a note
      const addNote = (title, description, tag)=>{
        console.log("Adding a new note");
        const note = {
          "_id": "63b1d3wwewe2f90e5181d2365f532",
          "user": "63b09af1ff48f4207f885d05",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-01-01T18:38:39.798Z",
          "__v": 0
        };
        setNotes(notes.concat(note));
      }

      // Delete a note
      const deleteNote = (id)=>{
        console.log("Deleting note with id"+id);
        // Only keeping those notes of different id
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote);
      }
      // Edit a note
      const editNote = (id)=>{
        
      }
    return(
        // Whichever things we want to provide , put it inside value., 
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
             {props.children} {/*Wrapping all childrens inside context*/}
        </NoteContext.Provider>
    )
}
export default NoteState;