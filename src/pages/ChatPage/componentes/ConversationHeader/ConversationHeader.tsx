import React from 'react';
import { useSocket } from '../../../../services/socket.ts';
import { useParams } from 'react-router-dom';
import { UserProps } from '../../interfaces/UserProps.tsx';
import './style.css';
// const Conversation: React.FC<ConversationProps> = ({user}) => {



const ConversationHeader:React.FC<UserProps> = ({name, phone_number}) =>{
    const { socket } = useSocket();
    const { room_id } = useParams();

    return (
      <div className="conversation_header">
        { name && phone_number &&(
            <h1>{name} - ({phone_number})</h1>
        )}
      </div>  
    );
}

export default ConversationHeader;