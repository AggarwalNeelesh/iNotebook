import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
  const a = useContext(noteContext)
  return (
    <div>
      iNotebook is.
    </div>
  )
}

export default About
