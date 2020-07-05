import { v4 as uuid } from 'uuid';

import AppError from '~/errors/AppError';
import IUserRepositories from '~/repositories/interfaces/IUserRepository';
import ICreateUserDTO from '~/repositories/dtos/ICreateUserDTO';
import IUser from '~/schemas/interfaces/IUser';

interface IFakeUser {
	id: string;
	username: string;
	email: string;
	password: string;
	defaultDestination: string;
}

class UserRepository implements IUserRepositories {
	private users: IFakeUser[] = [];

	public async create({
		username,
		email,
		password,
		defaultDestination,
	}: ICreateUserDTO): Promise<IUser> {
		const user = {
			id: uuid(),
			username,
			email,
			password,
			defaultDestination,
		};

		this.users.push(user);

		return user as IUser;
	}

	public async update(user: IUser): Promise<IUser> {
		const findUser = this.users.find(storedUser => storedUser === user);

		if (!findUser) {
			throw new AppError('User not found', 404);
		}

		const updatedUser = Object.assign(user, findUser);

		return updatedUser as IUser;
	}

	public async delete(id: string): Promise<void> {
		this.users.filter(user => user.id !== id);
	}

	public async findById(id: string): Promise<IUser | null> {
		const user = this.users.find(storedUser => storedUser.id === id);

		return user as IUser | null;
	}

	public async findByEmail(email: string): Promise<IUser | null> {
		const user = this.users.find(storedUser => storedUser.email === email);

		return user as IUser | null;
	}
}

export default UserRepository;
