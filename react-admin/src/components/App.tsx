import React, { useState, useEffect, useRef } from 'react';
import AddDrug from './AddDrug'
import SocketIOClient from 'socket.io-client';

function App() {
  const [name, setName] = useState();
  const [clients, setClients] = useState(0);
  const [emojis, setEmojis] = useState([]);
  const [messages, setMessages] = useState([]);
  let socketRef = useRef<any>();

  useEffect(() => {
    // Create a Web Socket Client connection
    socketRef.current = SocketIOClient('http://localhost:8080');

    // Listen for info about what name we were assigned and previous messages
    socketRef.current.on('connection', (data :any) => {
      // Initialize our chat view with recent messages from other users
      setMessages(data.messages);
      // Set our user's name
      setName(data.name);
      // Set the initial count
      setClients(data.clients);
    });

    // Listen for info about how many clients are connected
    socketRef.current.on('count', (count : any) => {
      // Update the client count
      setClients(count);
    });



    // When we unmount this component, release the web socket connection
    return () => socketRef.current.disconnect();
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
