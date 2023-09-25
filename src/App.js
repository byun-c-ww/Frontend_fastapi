import './App.css';
import docker_logo from './logos/docker_logo.png'
import aws_logo from './logos/aws_logo.png'
import react_logo from './logos/react_logo.png'
import fastapi_logo from './logos/FastAPI_logo.png'
import onnx_logo from './logos/onnx_logo.png'
import hf_logo from './logos/hf_logo.png'
import { useState, useEffect } from 'react';


function App() {
  const [text,setText] = useState("")
  const [apiResponse,setApiResponse] = useState("Press the 'Analyze' button \nto get Sentiment \nAnalysis Score!")
  const url = process.env.REACT_APP_API_URL + "/analyze"
  const data = {"text":text}

  useEffect(() => {
    if (text) {
      postData(url, data)
        .then((response) => {
          setApiResponse(response); // Update the response in state
        })
        .catch((error) => {
          console.error('API error:', error);
        });
    }
  }, [text]);

  async function postData(url, data = data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  function apiClickHandler(e) {
    let temp = document.querySelector(".user-textarea").value
    setText(temp)
  }
  return (
    <div className='page-container dark:bg-slate-700'>
      <div className='header text-5xl shadow-xl border-solid border-4 border-indigo-200 border-x-indigo-500'>
        Sentiment Analysis API
        <br></br>
        with DistilBERT model
        <br></br>
        <br></br>
        <div className='text-xl'>created using
          <div className='logo-container'>
            <img src={docker_logo} alt="docker"></img>
            <img src={aws_logo} alt="aws" className='aws'></img>
            <img src={react_logo} alt="react"></img>
            <img src={fastapi_logo} alt="fastapi" className='fastapi'></img>
            <img src={onnx_logo} alt="onnx" className='onnx'></img>
            <img src={hf_logo} alt="hf" className='hf'></img>
          </div>
        </div>
      </div>
      <div className='result-container'>
          <textarea className='user-textarea rounded-md shadow-xl border-solid border-4 border-indigo-500/100'
          placeholder='input text you want to analyze and get a sentiment analysis score'>
          </textarea>
          <button className='trigger-api rounded-full bg-cyan-400'
          onClick={apiClickHandler}>Analyze</button>
          <pre className='api-response shadow-xl border-solid border-4 border-x-fuchsia-600'>{typeof(apiResponse) == "object"? `{ emotion: ${apiResponse.emotion},` + `\ntime elapsed: ${apiResponse.time_elapsed},`+ "\nmodel accuracy: 0.89 }": apiResponse}</pre>
      </div>
    </div>

    );
}

export default App;
