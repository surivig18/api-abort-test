import React from 'react';
import './App.css';

function App() {

  let abortController = new AbortController()
  const handleOnClick = async () => {
    // setTimeout(()=> {
    //   console.log("cancelled request ");
    //   abortController.abort()}, 1000)
      const response = await fetch
      ('https://api.github.com/users/github',
          {signal: abortController.signal}
      );

      const data = await response.json();
      console.log(data);


  }

  const onCancelClick = (abort: AbortController) =>{
    abort.abort()
    abortController = new AbortController()
  }
  return (
    <div className="App">
      <Submit onClick = {handleOnClick} abortController={abortController}/>
      <Cancel onClick = {onCancelClick} abortController={abortController}/>
    </div>
  );
}

interface Props{
  onClick: any
  abortController: AbortController
}

const Submit = (props: Props) => {


  return (
      <button
          style={{ width: '100px', height: '40px', backgroundColor: '  #4CAF50', margin: '10px' }}
          onClick={props.onClick}
      >
        Submit API

      </button>
  )
}

const Cancel = (props: Props) => {

  return (
      <button
          onClick={()=> props.onClick(props.abortController)}
          style={{ width: '100px', height: '40px', backgroundColor: '  red', margin: '10px' }}>
        Cancel API
      </button>
  )
}
export default App;
