import React from 'react'

const Noteitem = (props) => {
    const note = props.note;
  return (
    <div className="card col-md-3 mx-2 my-3">
    <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
    </div>
  )
}

export default Noteitem