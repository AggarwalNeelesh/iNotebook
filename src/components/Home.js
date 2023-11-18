import React from 'react'
import Notes from './Notes';
import AddNote from './AddNote';

const Home = (props) => {
  const {showAlert} = props
  return (
    <>
      {localStorage.getItem('token')==null?
      "Please Login/Signup to access the application":
      <>
      <AddNote showAlert={props.showAlert}/>
      <Notes showAlert={showAlert}/>
      </>
      }
    </>
  )
}                         

export default Home
