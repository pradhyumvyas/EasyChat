import './App.css';

import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {nanoid} from "nanoid";

//no dotney
const socket = io.connect("http://192.168.1.13:5000");
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
        <h1 className="text-3xl font-bold py-3">Easy Chat</h1>

        {chat.map((payload, index)=>{
          return(
            <p key={index}>{payload.message} -- 
            <span>id: {payload.userName}</span>
            </p>
          )
        })}

        <form className='flex w-full max-w-sm items-center space-x-2' onSubmit={sendChat}>
        <input
          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
          type="text"
          placeholder="Write a message" 
          value={message}
          onChange={(e)=>{
          setMessage(e.target.value);
          }}/>
        <button type='submit'
            className="active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-1 bg-indigo-600 focus:ring-indigo-400 focus:ring-offset-1 dark:hover:bg-indigo-700 dark:hover:text-gray-100 disabled:opacity-50 dark:focus:ring-indigo-400 disabled:pointer-events-none dark:focus:ring-offset-gray-900 dark:bg-indigo-600 text-white hover:bg-indigo-700 h-10 py-2 px-4">
            Send
        </button>
        </form>
    </div>
  );
}

export default App;
