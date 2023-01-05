import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context; // De structuring
  return (
    <div className='row'>
        {notes.map((note) =>{
            // return note.title
            return <Noteitem key={note._id} note={note}/> ;
        })}
    </div>
  )
}

export default Notes