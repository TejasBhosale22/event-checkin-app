import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(process.env.EXPO_PUBLIC_SOCKET_URL || 'http://localhost:4000');
  }
  return socket;
};

export const getSocket = () => socket;
