import React from 'react'

const Noteitem = (props) => {
    const note = props.note;
  return (
    <div className="card col-md-3 mx-2 my-3">
    <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <i class="fa-regular fa-plus mx-2"></i>
        <i class="fa-solid fa-pen-to-square mx-2"></i>
        <i className="fa-solid fa-trash mx-2"></i>
    </div>
    </div>
  )
}

export default Noteitem