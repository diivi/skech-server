import { User } from './user';

export type Room = {
	id: string;
	drawer: User;
	users: User[];
};
