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

const PORT = process.env.PORT || 5000;


io.on('connection', (socket) => {
	socket.on('join-room',(data)=>{
		console.log(data)
		socket.join(data.roomId);
		io.to(data.roomId).emit('user-connected',data.userId);
	})
	socket.on('message', (message: string) => {
		console.log(message);
		io.emit('message', message);
	});
	socket.on('draw', (data) => {
		io.emit('draw', data);
	});
});

app.get('/:room', (req, res) => {
	console.log(req.params.room);
});

server.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
