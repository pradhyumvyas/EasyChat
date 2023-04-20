import './App.css';

import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {nanoid} from "nanoid";

//no dotney
const socket = io.connect("http://localhost:5000");

function App() {

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([])

  const sendChat = (e)=>{
    e.preventDefault()
    socket.emit("chat", {message})
    setMessage('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Easy Chat</h1>
        <form action="" onSubmit={sendChat}>
          <input type="text" name="chat" id="" placeholder='send text' 
          value={message}
          onChange={(e)=>{
            setMessage(e.target.value)
          }}
          />
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
