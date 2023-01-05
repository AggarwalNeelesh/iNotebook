import React , { useState }from "react";
import NoteContext from "./noteContext";
// It will hold all the states related to notes.
const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "63b1d32f90e5181d2365f532",
          "user": "63b09af1ff48f4207f885d05",
          "title": "What it is to be like learning alone ?",
          "description": "It is the best way to purify our mind and soul , keeping our productivity at its pinnacle.",
          "tag": "Study Hacks",
          "date": "2023-01-01T18:38:39.798Z",
          "__v": 0
        },
        {
          "_id": "63b1df73cc6c180b13cf6f92",
          "user": "63b09af1ff48f4207f885d05",
          "title": "What it is to be like learning alone ?",
          "description": "It is the best way to purify our mind and soul , keeping our productivity at its pinnacle.",
          "tag": "Study Hacks",
          "date": "2023-01-01T19:30:59.606Z",
          "__v": 0
        }
      ];
      const [notes, setNotes] = useState(notesInitial);
    return(
        // Whichever things we want to provide , put it inside value., 
        <NoteContext.Provider value = {{notes, setNotes}}>
             {props.children} {/*Wrapping all childrens inside context*/}
        </NoteContext.Provider>
    )
}
export default NoteState;