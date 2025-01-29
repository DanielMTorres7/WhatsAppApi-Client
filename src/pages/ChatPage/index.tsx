import React, { useEffect } from 'react';
import { useSocket } from '../../services/socket.ts';
import './style.css';
import SideBar from './componentes/sideBar/sideBar.tsx';
import Conversation from './componentes/Conversation/Conversation.tsx';
import { useParams } from 'react-router-dom';

function ChatPage() {
  const { room_id } = useParams();
  const { socket } = useSocket();
  console.log(room_id);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor!');
      socket.emit('join_room', { room: room_id , employee_id: "Daniel"});
    });
    return () => {
      socket.off('connect');
      socket.emit('leave', { room: room_id });
    };
  }, []);

  return (
    <div className="app">
      <SideBar/> 
      
      <Conversation/>
      
    </div>
  );
}

export default ChatPage;