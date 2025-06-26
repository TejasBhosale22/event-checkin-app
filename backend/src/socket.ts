import { Server } from 'socket.io';
import http from 'http';

export const setupSocket = (server: http.Server): Server => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinRoom', (eventId: string) => {
  const room = `event-${eventId}`;
  socket.join(room);
  console.log(`Socket ${socket.id} joined room ${room}`);
});


    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  return io;
};
