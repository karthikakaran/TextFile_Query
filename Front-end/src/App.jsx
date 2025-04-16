import { useState } from "react";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import QueryAutocomplete from './QueryAutocomplete';
import FileUpload from './FileUpload';
import ResultSnippet from './ResultSnippet';

function App() {
  const [fileName, setFileName] = useState(null);
  const [resultSnippet, setResultSnippet] = useState("")

  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <h5>File Parser</h5>
        </div>
        <div className="card-body">
          <FileUpload fileNameSetter={setFileName}></FileUpload>
          <QueryAutocomplete fileName={fileName} resultSnippetSetter={setResultSnippet}></QueryAutocomplete>
        </div>
        <ResultSnippet resultSnippet={resultSnippet}></ResultSnippet>        
      </div>
    </>
  )
}

export default App
