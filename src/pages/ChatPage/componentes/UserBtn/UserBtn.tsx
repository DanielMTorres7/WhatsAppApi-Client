import React from 'react';
import { UserProps } from '../../interfaces/UserProps.tsx';
import './style.css';

const UserBtn: React.FC<UserProps> = (UserProps) => {
  let statusIcon = '';
  if (!UserProps.last_message) {
    statusIcon = ''; // Se 'read' existe, usa ícone de lido
  } else {
    if (UserProps.last_message.status.some(s => s.status === 'read')) {
      statusIcon = '✓✓'; // Se 'read' existe, usa ícone de lido
    } else if (UserProps.last_message.status.some(s => s.status === 'delivered')) {
      statusIcon = '✓✓'; // Se 'delivered' existe e 'read' não, usa ícone de entregue
    } else if (UserProps.last_message.status.some(s => s.status === 'sent')) {
      statusIcon = '✓'; // Se 'sent' existe e os outros não, usa ícone de enviado
    } else if (UserProps.last_message.status.some(s => s.status === 'failed')) {
      statusIcon = '✗'; // Se 'failed' existe, usa ícone de falha
    }
    if (UserProps.last_message.from !== 'DsTorres') {
      statusIcon = '';
    }
  }
  let timestamp = '';
  if (UserProps.last_message && UserProps.last_message.timestamp) {
    timestamp = new Date(UserProps.last_message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  let name = UserProps.name !== "Desconhecido" ? UserProps.name : "(" + UserProps.phone_number + ")";

  return (
    <button className='user_btn' onClick={UserProps.onClick}>
      <div className='user_btn_img'>
        <span></span>
      </div>
      <div className='user_btn_info'>
        <p>{name}</p>
        {UserProps.last_message && UserProps.last_message.text &&(
          <div className='user_btn_last_message'>
            <p>{statusIcon} {UserProps.last_message.text.length > 10 ? UserProps.last_message.text.slice(0, 30) + '...' : UserProps.last_message.text} </p>   
          </div>
        )}
        <span>{timestamp}</span>
      </div>
      {UserProps.unread_messages > 0 && (
        <span className='user_btn_pop'>{UserProps.unread_messages}</span>
      )}
    </button>
  );
};

export default UserBtn;