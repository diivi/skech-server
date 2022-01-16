import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Room } from '../types/room';
import { User } from '../types/user';
import { handleDrawing } from './handleDrawing';
import { handleMessages } from './handleMessages';

export const handleRoomEvents = (
	socket: Socket,
	io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
	rooms: Map<string, Room>
) => {
	socket.on('join-room', (user: User) => {
		const { roomId, id: userId, name } = user;
		const room = rooms.get(roomId);
		if (!room) {
			const newRoom = {
				id: roomId,
				drawer: user,
				users: [user]
			};
			rooms.set(roomId, newRoom);
			socket.join(roomId);
			socket.broadcast.to(roomId).emit('user-connected', user);
		} else {
			room.users.push(user);
			socket.join(roomId);
			socket.broadcast.to(roomId).emit('user-connected', user);
		}
		socket.on('disconnect', () => {
			socket.broadcast.to(roomId).emit('user-disconnected', user);
			const room = rooms.get(roomId);
			if (room) {
				const index = room.users.findIndex((u) => u.id === userId);
				if (index !== -1) {
					room.users.splice(index, 1);
				}
			}
		});
		handleMessages(socket, io, roomId);
		handleDrawing(socket, io, roomId);
	});
};
