import React, { useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context; // De structuring
    const [note, setNote] = useState({id:"",etitle:"", edescription:"", etag:""});
    useEffect(() => {
      getNotes();
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote =(currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const handleClick = (e)=>{
      props.showAlert("Updating Note...", "success")
      console.log("Updating note",note);
      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
    }
    // Changing state of note when typing in textfield
    const onChange = (e)=>{
        // ...note => jo chiz note me phele se hai vo rahe
        // baki usme ab ye chiz add karo ya overwrite karo
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter title" required/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Description</label>
              <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} placeholder="Description" minLength={5} required/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Tag</label>
              <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} placeholder="tag" required/>
            </div>
          </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className='row'>
        <div className="container" >
          {notes.length===0 && 'No notes to display'}
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