import './App.css';

import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {nanoid} from "nanoid";

//no dotney
const socket = io.connect("http://localhost:5000");
const userName = nanoid(4)

function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([])

  const sendChat = (e)=>{
    e.preventDefault();
    console.log("chat", chat);
    socket.emit("EasyChat", {message, userName});
    setMessage("");
  }

  useEffect(()=>{
    socket.on("EasyChat", (payload)=>{
      console.log("helloo effect")
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Easy Chat</h1>

        {chat.map((payload, index)=>{
          return(
            <p key={index}>{payload.message} -- 
            <span>id: {payload.userName}</span>
            </p>
          )
        })}

        <form onSubmit={sendChat}>
          <input 
          type="text" 
          name="chat" 
          placeholder='send text' 
          value={message}
          onChange={(e)=>{
            setMessage(e.target.value);
          }}
          />
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
