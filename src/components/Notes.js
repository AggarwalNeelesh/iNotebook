import React, { useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context; // De structuring
    useEffect(() => {
      getNotes();
    }, [])
    
  return (
    <>
    <AddNote/>
    <div className='row'>
        {notes.map((note) =>{
            // return note.title
            return <Noteitem key={note._id} note={note}/> ;
        })}
    </div>
    </>
  )
}

export default Notes