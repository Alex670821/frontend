// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Picker from 'emoji-picker-react';
import '../styles/Chat.css'; // Importa los estilos CSS

const Chat = ({ directoId, userEmail }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const client = useRef(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/chat/messages/${directoId}/`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched messages:', data);
        setMessages(data);
      });

    client.current = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${directoId}/`);

    client.current.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('Received message:', dataFromServer);
      setMessages((prevMessages) => [...prevMessages, dataFromServer]);
    };

    return () => {
      client.current.close();
    };
  }, [directoId]);

  const sendMessage = () => {
    const messageData = {
      user: userEmail,
      message: message,
    };
    console.log('Sending message:', messageData);
    client.current.send(JSON.stringify(messageData));
    
    // Actualiza el estado de los mensajes inmediatamente
    setMessages((prevMessages) => [...prevMessages, { user: userEmail, message: message }]);
    setMessage('');
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log('Selected emoji:', emojiObject);
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
        {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
