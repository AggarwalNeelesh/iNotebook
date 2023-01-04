import React from "react";
import NoteContext from "./noteContext";
// It will hold all the states related to notes.
const NoteState = (props)=>{
    const state = {
        "name": "Neelesh",
        "class": "10D"
    }
    // const [state, setState] = useState(s1);
    // const update = ()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name": "Neelesh Aggarwal",
    //             "class": "10D Raja Rammohan Roy Academy"
    //         })
    //     }, 4000);
    // }
    return(
        // Whichever things we want to provide , put it inside value., 
        <NoteContext.Provider value = {state}>
             {props.children} {/*Wrapping all childrens inside context*/}
        </NoteContext.Provider>
    )
}
export default NoteState;