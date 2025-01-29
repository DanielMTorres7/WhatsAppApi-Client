import React, { useState, useEffect, useRef  } from 'react';
import { UserProps } from '../../interfaces/UserProps.tsx';
import UserBtn from '../UserBtn/UserBtn.tsx';
import { useSocket } from '../../../../services/socket.ts';
import { useParams, useNavigate } from 'react-router-dom';

import './style.css';

interface SideBarProps {
    callback?: (conversation_id: any) => void;
}

const SideBar: React.FC<SideBarProps> = ({callback}) => {
    const { socket } = useSocket();
    const [Users, setUsers] = useState<UserProps[]>([]); // Crie uma ref para a div
    const { room_id } = useParams();
    const navigate = useNavigate();
    console.log(room_id);

    useEffect(() => {
      socket.on('users', (users) => {
        if (users.length === 0) return;
  
        const parsedUsers = users.map((userString: string) => {
          const user = JSON.parse(userString);
          return {
            ...user,
            onClick: () => {
              socket.emit('get_conversation', { phone_number: user.phone_number, employee_id: 'Daniel' });
              if (callback) callback(user.phone_number);
            },
            last_message: user.last_message ? JSON.parse(user.last_message) : null,
          };
        });
  
        // Ordenar usuários antes de atualizar o estado
        setUsers(sortUsersByLastMessage(parsedUsers));
      });
  
      return () => {
        socket.off('users');
      };
    }, [socket, callback]);

    useEffect(() => {
      socket.on('update_user', (data) => {
        const updatedUser = JSON.parse(data);
  
        updatedUser.onClick = () => {
          socket.emit('get_conversation', { phone_number: updatedUser.phone_number, employee_id: 'Daniel' });
          if (callback) callback(updatedUser.phone_number);
        };
  
        updatedUser.last_message = updatedUser.last_message
          ? JSON.parse(updatedUser.last_message)
          : null;
  
        setUsers((prevUsers) => {
          const userIndex = prevUsers.findIndex((user) => user.phone_number === updatedUser.phone_number);
  
          let updatedUsers;
          if (userIndex === -1) {
            // Adicionar novo usuário
            updatedUsers = [...prevUsers, updatedUser];
          } else {
            // Atualizar usuário existente
            updatedUsers = [...prevUsers];
            updatedUsers[userIndex] = updatedUser;
          }
  
          // Ordenar usuários após a atualização
          return sortUsersByLastMessage(updatedUsers);
        });
      });
      
      return () => {
        socket.off('update_user');
      };
    }, [socket, callback]);

    const sortUsersByLastMessage = (users: UserProps[]) => {
      return users.sort((a, b) => {
        const aTimestamp = a.last_message?.timestamp ? new Date(a.last_message.timestamp).getTime() : 0;
        const bTimestamp = b.last_message?.timestamp ? new Date(b.last_message.timestamp).getTime() : 0;
        return bTimestamp - aTimestamp; // Ordem decrescente
      });
    };

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [template, setTemplate] = React.useState('');

    function send_template() {
      socket.emit('send_template', { room: room_id, template_name:template, phone_number:phoneNumber });
    }
    
    return (
        <div className='sidebar'>
          <div className='header_room'>
            <button
              onClick={
                () => {
                  socket.emit('leave', { room: room_id });
                  navigate('/');
                }
              }
            >{"<-"}</button>
            <h1>{room_id}</h1>
          </div>
          <div className='header_send_template'>
            <p>Iniciar conversa</p>
            <select defaultValue={""} value={template} onChange={(e) => setTemplate(e.target.value)}>
              <option value="">Selecionar um template</option>
              <option value="test_research">Pesquisa de satisfação</option>
            </select>
            <input 
              type='text' 
              placeholder='número do whatsapp' 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
            <button onClick={send_template}>Enviar</button>
          </div>
        {Users.map((user) => (
          <UserBtn key={`${user.phone_number}`}
            {...user}
          />
        ))}
      </div>
    );

}
export default SideBar;