import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
  const a = useContext(noteContext)
  // useEffect(() => {
  //   a.update();
  //   // eslint-disable-next-line
  // }, [])
  
  return (
    <div>
      {a.name} was a extraordinary child from class {a.class}.
    </div>
  )
}

export default About
