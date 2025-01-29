import { io, Socket } from 'socket.io-client';

const socket :Socket = io('https://whatsapp.dstorres.com.br', {
  reconnection: true,  // Habilitar reconexão automática
  reconnectionAttempts: Infinity, // Número máximo de tentativas de reconexão (infinito neste caso)
  reconnectionDelay: 100, // Tempo de espera inicial antes de tentar reconectar (em milissegundos)
  reconnectionDelayMax: 500, // Tempo máximo de espera entre tentativas de reconexão
  randomizationFactor: 0.5, // Fator de randomização para o tempo de espera
});
export const useSocket = () => {
  return { socket };
};