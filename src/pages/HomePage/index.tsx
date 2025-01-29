import React, { useEffect } from 'react';
import { useSocket } from '../../services/socket.ts';
import './style.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const { socket } = useSocket();

    function entrarSala() {
        const sala = (document.getElementById('salas') as HTMLSelectElement).value;
        socket.emit('join_room', { room: sala , employee_id: "Daniel"});
        navigate('/chatpage/' + sala);
    }

    return (
        <div className="app">
            <p>Entrar na sala</p>
            <select name="Sala" id="salas">
                <option value="general">General</option>
                <option value="suporte">Suporte</option>
            </select>
            <button onClick={entrarSala}>Entrar</button>
        </div>
    );
}

export default HomePage;