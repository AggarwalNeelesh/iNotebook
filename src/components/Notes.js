import React, { useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context; // De structuring
    const [note, setNote] = useState({id:"",etitle:"", edescription:"", etag:""});
    useEffect(() => {
      getNotes(props.notetype);
    },[])
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote =(currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const handleClick = (e)=>{
      e.preventDefault();
      props.showAlert("Updating Note...", "success")
      console.log("Updating note",note);
      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
    }
    // Changing state of note when typing in textfield
    const onChange = (e)=>{
        e.preventDefault();
        // ...note => jo chiz note me phele se hai vo rahe
        // baki usme ab ye chiz add karo ya overwrite karo
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <>
    <h2>{props.notetype==='global'?"Global Notes":"Your Notes"}</h2>
    
    <div className='row'>
        <div className="container" >
          {notes && notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) =>{
            // return note.title
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/> ;
        })}
    </div>
    </>
  )
}

export default Notes