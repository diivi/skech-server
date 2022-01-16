import { Message } from '../types/message';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const handleMessages = (
	socket: Socket,
	io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
	room: string
) => {
	socket.on('message', (message: Message) => {
		io.to(room).emit('message', message);
	});
};
