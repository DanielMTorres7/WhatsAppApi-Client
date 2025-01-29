import React, { useEffect } from 'react';
import { ApiMessage } from '../../interfaces/ApiMessage.tsx';
import { useSocket } from '../../../../services/socket.ts';

const UserMessage: React.FC<ApiMessage> = (message) => {
  const { from, text, timestamp } = message;
  const { socket } = useSocket();

  // socket.emit('message_read', { message_id: message.id });

  return (
    <div className="user-message">
      <p>{text}</p>
      <span>{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  );
};

export default UserMessage;