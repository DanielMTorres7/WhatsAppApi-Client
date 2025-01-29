import React from 'react'; // Importe o React
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/index.tsx';
import ChatPage from './pages/ChatPage/index.tsx';

function AppRoutes() {
  return (
    <Routes> 
      <Route path="/" element={<HomePage />} /> 
      <Route path="/chatpage/:room_id" element={<ChatPage />} />
    </Routes>
  );
}

export default AppRoutes;