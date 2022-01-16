import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const handleDrawing = (
	socket: Socket,
	io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
	room: string
) => {
	socket.on('draw', (data) => {
		io.to(room).emit('draw', data);
	});
};
