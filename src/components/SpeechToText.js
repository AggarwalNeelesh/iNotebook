import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const addToNoteTitle=()=>{
    props.setNote({...props.note, title:props.note.title +" "+transcript});
  }

  const addToNoteDescription=()=>{
    // It will transfer data from transcript variable to the note's description which is a state variable.
    props.setNote({...props.note, description:props.note.description +" "+transcript});
  }

  const addToNoteTag=()=>{
    props.setNote({...props.note, tag:props.note.tag +" "+transcript});
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='container mx-0 px-3 py-3' style={{'border': '1px solid grey', 'borderRadius': '5px'}}>
    <div className="row">
      <div className="col-4"><h3>Voice to Text Feature :- </h3></div>
      <div className="col-2"><p>Microphone: {listening ? 'on' : 'off'}</p></div>
    </div>
    <div className="row">
      <div className="col">
        <div className="row my-2 mx-0" style={{'margin': 'auto', 'textAlign': 'center'}}>
          <div className="row">
            <div className="col-3">Controls:-</div>
            <div className="col">
            <button className="mx-1 btn btn-success"  onClick={SpeechRecognition.startListening}>Start</button>
            <button className="mx-1 btn btn-danger"  onClick={SpeechRecognition.stopListening}>Stop</button>
            <button className="mx-1 btn btn-warning"  onClick={resetTranscript}>Reset</button>
            </div>
          </div>
          
        </div>
          <div className="row">
            <div className="col-3">Add to:-</div>
            <div className="col">
              <button className="mx-1 btn btn-primary" onClick={addToNoteTitle}>Title</button>
              <button className="mx-1 btn btn-primary" onClick={addToNoteDescription}>Description</button>
              <button className="mx-1 btn btn-primary" onClick={addToNoteTag}>Tag</button>
            </div>
          </div>
        </div>
      <div className="col-8">
        <textarea className="container" style={{'margin':'auto'}} type="text" id="text" name="text" value={transcript} placeholder="Press Start Button" rows={3}/>
      </div>
    </div>
    </div>
  );
};
export default SpeechToText;