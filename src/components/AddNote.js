import React , { useContext , useState }from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = () => {
    const context = useContext(noteContext); //Using Context
    const {addNote} = context; // De structuring
    //Creating state
    const [note, setNote] = useState({title:"", description:"", tag:"default"})

    // Adding note
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    // Changing state of note when typing in textfield
    const onChange = (e)=>{
        // ...note => jo chiz note me phele se hai vo rahe
        // baki usme ab ye chiz add karo ya overwrite karo
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
        <div className="container my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter title"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange} placeholder="Description"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} placeholder="tag"/>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
      </form>
      <h2>Your Notes</h2>
      </div>
    </div>
  )
}

export default AddNote