import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Room } from './types/room';
import { handleRoomEvents } from './events/roomEvents';


const app = express();

const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		credentials: true
	}
});

const rooms = new Map<string, Room>();

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
	handleRoomEvents(socket,io, rooms);
});	

server.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
