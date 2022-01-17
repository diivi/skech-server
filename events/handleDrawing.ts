import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const handleDrawing = (socket: Socket, io: Server<DefaultEventsMap>, room: string): void => {
	socket.on('draw', (data) => {
		io.to(room).emit('draw', data);
	});
};
