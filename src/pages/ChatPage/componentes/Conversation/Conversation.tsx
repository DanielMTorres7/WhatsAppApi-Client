import React, { useEffect, useRef, useState  } from 'react';
import ClientMessage from '../ClientMessage/ClientMessage.tsx';
import UserMessage from '../UserMessage/UserMessage.tsx';
import { ApiMessage } from '../../interfaces/ApiMessage';
import { useSocket } from '../../../../services/socket.ts';
import { useParams } from 'react-router-dom';
import ConversationHeader from '../ConversationHeader/ConversationHeader.tsx';
import { UserProps } from '../../interfaces/UserProps.tsx';
import './style.css';
// const Conversation: React.FC<ConversationProps> = ({user}) => {



const Conversation:React.FC = () =>{
    const conversationRef = useRef<HTMLDivElement>(null); // Crie uma ref para a div
    const { socket } = useSocket();
    const [messages, setMessages] = useState<ApiMessage[]>([]);
    const [protocolControlled, setProtocolControlled] = useState<boolean>(false);
    const [User, setUser] = useState<UserProps>();
    
    const { room_id } = useParams();
    console.log(room_id);

    useEffect(() => {
        socket.on('message', (message) => {
          message = JSON.parse(message) as ApiMessage;
          setMessages((prevMessages) => [...prevMessages, message]);
          socket.emit('read_messages', { conversation_id: message.conversation_id });
        });
        return () => {
          socket.off('message');
        }
      }, []);
    useEffect(() => {
        socket.on('message_error', (data) => {
          console.log('Erro ao enviar mensagem:', data);
        });
        return () => {
          socket.off('message_error');
        }
      }, []);
    useEffect(() => {
        socket.on('exit_protocol_error', (data) => {
          alert(data.erro);
        });
        return () => {
          socket.off('exit_protocol_error');
        }
      }
    , []);
    useEffect(() => {
        socket.on('protocol_controlled', (protocol_control) => {
          setProtocolControlled(protocol_control);
        });
        return () => {
          socket.off('protocol_controlled');
        }
      }, []);

    useEffect(() => {
        socket.on('conversation', (conversation) => {
          // Usar um loop para adicionar as mensagens ao estado
          conversation = JSON.parse(conversation);
          setMessages((prevMessages) => {
            let new_messages : ApiMessage[] = []
            for (let i = 0; i < conversation.messages.length; i++) {
              let message = JSON.parse(conversation.messages[i]);
              new_messages = [...new_messages, message];
            }
            return new_messages;
          });
          setProtocolControlled(conversation.protocol_controlled);
          setUser(conversation.user);
          console.log('Nova conversa:', conversation);
        });

    
        // Limpar a conexão ao desmontar o componente
        return () => {
          socket.off('conversation');
        };
      }, []);

    useEffect(() => {
      socket.on('update_message', (data) => {
        data = JSON.parse(data) as ApiMessage;
        setMessages((prevMessages) => {
          const messageIndex = prevMessages.findIndex((message) => message.id === data.id);
          let updatedMessages;
          if (messageIndex === -1) {
            // Adicionar nova mensagem
            updatedMessages = [...prevMessages, data];
          } else {
            // Atualizar mensagem existente
            updatedMessages = [...prevMessages];
            updatedMessages[messageIndex] = data;
          }
          return updatedMessages;
        });
      });
      return () => {
        socket.off('update_message');
      }
    }, []);


    useEffect(() => {
            // Scroll para baixo após a atualização do estado
            if (conversationRef.current) {
                conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
            }
        }, [messages]);

    const [message, setMessage] = useState<string>('');

    function send_message() {
      console.log('Enviando mensagem:', message, User?.phone_number);
      socket.emit('send_message', { phone_number: User?.phone_number, message: message });
      setMessage(''); // Limpar o campo de entrada após o envio
    }

    return (
      <div className="conversation" ref={conversationRef}>
        {User &&(
          <ConversationHeader {...User}/>
        )}
        {User && messages.map((message) => (
          <div className='message' key={message.id}>
            {
              message.from === 'DsTorres' ? (
                <ClientMessage {...message}/>
              ) : (
                <UserMessage {...message}/>
              )
            }
          </div>
        ))}
        {User && (
          <div className='hotbar'>
            {protocolControlled ? (
              <div className='hotbar_info'>
                <span>Chat sendo controlado pela IA</span>
                <button
                  className='take_control_button'
                  onClick={() => socket.emit('exit_protocol', { conversation_id: User?.phone_number })}
                >Assumir controle</button>
              </div>
            ) : (
              null
            )}
            <input
              disabled={protocolControlled} 
              type='text' 
              placeholder='Digite sua mensagem' 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className='send_button'
              disabled={protocolControlled} 
              onClick={send_message}
            >
              Enviar
            </button>
          </div>
        )}
        
      </div>  
    );
}

export default Conversation;