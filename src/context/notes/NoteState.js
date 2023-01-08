import React , { useState }from "react";
import NoteContext from "./noteContext";
// It will hold all the states related to notes.
const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = [];
      // notes is an array
      const [notes, setNotes] = useState(notesInitial);

      // Get all Notes
      const getNotes = async()=>{
        //API call : Fetching all Notes
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMDlhZjFmZjQ4ZjQyMDdmODg1ZDA1In0sImlhdCI6MTY3MjUxODUzN30.ojsj1ZIoYvBq_ESQsmoYVz-oZh8dKMxLQch2c0Er10g' // Hard coding auth token
          }
        });
        const json = await response.json();
        setNotes(json); // Updating notes array
        console.log(json);
      }
      // Add a note
      const addNote = async(title, description, tag)=>{
        //API call : To add note
        const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
          method: 'POST', // Using post method
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMDlhZjFmZjQ4ZjQyMDdmODg1ZDA1In0sImlhdCI6MTY3MjUxODUzN30.ojsj1ZIoYvBq_ESQsmoYVz-oZh8dKMxLQch2c0Er10g'
          },
          body: JSON.stringify({title, description, tag}) // Sending data in body
        });

        //Logic to add in client
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
        // adding note in notes array
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
      const editNote = async (id, title, description, tag)=>{
        //API call : To update note
        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMDlhZjFmZjQ4ZjQyMDdmODg1ZDA1In0sImlhdCI6MTY3MjUxODUzN30.ojsj1ZIoYvBq_ESQsmoYVz-oZh8dKMxLQch2c0Er10g'
          },
          body: JSON.stringify({title, description, tag}) // Sending data to be updated
        });
        const json =  response.json();

        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
        }
      }
    return(
        // Whichever things we want to provide , put it inside value., 
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
             {props.children} {/*Wrapping all childrens inside context*/}
        </NoteContext.Provider>
    )
}
export default NoteState;