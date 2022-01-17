import { Message } from '../types/message';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const handleMessages = (
	socket: Socket,
	io: Server<DefaultEventsMap>,
	room: string
): void => {
	socket.on('message', (message: Message) => {
		io.to(room).emit('message', message);
	});
};
