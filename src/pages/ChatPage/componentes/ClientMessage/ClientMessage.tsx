import React from 'react';
import { ApiMessage } from '../../interfaces/ApiMessage.tsx';

// Determine the icon based on the message status

const ClientMessage: React.FC<ApiMessage> = (message) => {
  let statusIcon = '';
  let color = '#ccc';
  if (message.status.some(s => s.status === 'read')) {
    color = '#44abce'; // Se 'read' existe, usa ícone de lido
    statusIcon = '✓✓'; // Se 'read' existe, usa ícone de lido
  } else if (message.status.some(s => s.status === 'delivered')) {
    statusIcon = '✓✓'; // Se 'delivered' existe e 'read' não, usa ícone de entregue
  } else if (message.status.some(s => s.status === 'sent')) {
    statusIcon = '✓'; // Se 'sent' existe e os outros não, usa ícone de enviado
  } else if (message.status.some(s => s.status === 'failed')) {
    statusIcon = '✗'; // Se 'failed' existe, usa ícone de falha
  }
  return (
    <div className="client-message">
    {/* <strong>{message.from}</strong> */}
    <p>{message.text}</p>
    {/* Mostrar time stamp como HH:mm */}
    <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    <span style={{ color: color }}> {statusIcon}</span>
    </div>
  );
};

export default ClientMessage;