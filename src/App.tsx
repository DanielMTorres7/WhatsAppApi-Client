import React from 'react'; // Importe o React
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage/index.tsx';
import ChatPage from './pages/ChatPage/index.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;