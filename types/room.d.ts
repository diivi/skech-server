import { User } from './user';

export type Room = {
	id: string;
	drawer: User;
	timer?: number;
	rounds?: number;
	currentRound?: number;
	timeLeft?: number;
	// customWords: string[];
	// useOnlyCustomWords: boolean;
	users: User[];
};
