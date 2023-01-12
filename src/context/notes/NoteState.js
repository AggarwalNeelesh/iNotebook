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
        const note  = await response.json();
        setNotes(notes.concat(note));// adding note in notes array
        
        getNotes();
      }

      // Delete a note
      const deleteNote = async(id)=>{
       // API call : to delete the note
       const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMDlhZjFmZjQ4ZjQyMDdmODg1ZDA1In0sImlhdCI6MTY3MjUxODUzN30.ojsj1ZIoYvBq_ESQsmoYVz-oZh8dKMxLQch2c0Er10g'
          }
        });
        const json = response.json();
        console.log(json);
        // Deleting note
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
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMDlhZjFmZjQ4ZjQyMDdmODg1ZDA1In0sImlhdCI6MTY3MjUxODUzN30.ojsj1ZIoYvBq_ESQsmoYVz-oZh8dKMxLQch2c0Er10g'
          },
          body: JSON.stringify({title, description, tag}) // Sending data to be updated
        });
        const json =  await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes)) // Creating Deep copy of notes
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }
    return(
        // Whichever things we want to provide , put it inside value., 
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
             {props.children} {/*Wrapping all childrens inside context*/}
        </NoteContext.Provider>
    )
}
export default NoteState;