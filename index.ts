import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		credentials: true
	}
});

type User = {
	id: string;
	name: string;
	roomId: string;
};

type Room = {
	id: string;
	drawer: User;
	users: User[];
};

type Message = {
	from : string;
	text: string;
}

const rooms = new Map<string, Room>();

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
	socket.on('join-room', (data) => {
		const { roomId, userId, name } = data;
		const user = { id: userId, name, roomId };
		const room = rooms.get(roomId);
		if (!room) {
			const newRoom = {
				id: roomId,
				drawer: user,
				users: [user]
			};
			rooms.set(roomId, newRoom);
			socket.join(roomId);
			socket.broadcast.to(roomId).emit('user-connected', userId);
		} else {
			room.users.push(user);
			socket.join(roomId);
			socket.broadcast.to(roomId).emit('user-connected', userId);
		}
		console.log(rooms);
		rooms.forEach((room) => {
			console.log(room.users);
		});
		socket.on('disconnect', () => {
			socket.broadcast.to(roomId).emit('user-disconnected', userId);
		});
	});
	socket.on('message', (message:Message ) => {
		io.emit('message', message);
	});
	socket.on('draw', (data) => {
		io.emit('draw', data);
	});
});

server.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
