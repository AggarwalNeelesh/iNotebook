import React , { useContext , useState }from 'react'
import noteContext from '../context/notes/noteContext'
import SpeechToText from './SpeechToText';
import VoiceRecorder from './VoiceRecorder';
const AddNote = (props) => {
    const context = useContext(noteContext); //Using Context
    const {addNote} = context; // De structuring
    //Creating state
    const [note, setNote] = useState({title:"", description:"", tag:""})

    // Adding note
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
    }
    // Changing state of note when typing in textfield
    const onChange = (e)=>{
      e.preventDefault();
        // ...note => jo chiz note me phele se hai vo rahe
        // baki usme ab ye chiz add karo ya overwrite karo
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
        <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className='h5'>Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter title" required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className='h5'>Description</label>
          <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} placeholder="Description" minLength={5} required/>
        </div>
        <div className="form-group">
          <label htmlFor="tag" className='h5'>Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder="tag" required/>
          <p style={{'color':'grey'}}>* Use <u>global</u> tag to display your note publically.</p>
        </div>
        <button disabled={note.title.length<3||note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
      </form>
      {/* <VoiceRecorder/> */}
      <SpeechToText note={note} setNote={setNote}/>
      </div>
    </div>
  )
}

export default AddNote