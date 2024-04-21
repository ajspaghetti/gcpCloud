// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import WebSocketService from './services/WebSocketService';

function App() {
  const [ws, setWs] = useState<WebSocketService | null>(null);

  useEffect(() => {
    const websocket = new WebSocketService('ws://localhost:3000/ws');

    websocket.onOpen(() => console.log('WebSocket connection established'));
    websocket.onClose(() => console.log('WebSocket connection closed'));
    websocket.onError((error) => console.error('WebSocket error:', error));
    websocket.onMessage((message) => console.log('WebSocket message received:', message));

    setWs(websocket);

    return () => {
      websocket?.close();
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage ws={ws} />} />
      </Routes>
    </Router>
  );
}

export default App;
