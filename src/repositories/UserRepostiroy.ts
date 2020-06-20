import { Document } from 'mongoose';
import IUserRepositories from './interfaces/IUserRepository';
import ICreateUserDTO from './interfaces/dtos/ICreateUserDTO';
import User from '../schemas/User';
import IUser from '../schemas/interfaces/IUser';

class UserRepository implements IUserRepositories {
	public async create({
		username,
		email,
		password,
		defaultDestination,
	}: ICreateUserDTO): Promise<IUser> {
		const user = await User.create({
			username,
			email,
			password,
			defaultDestination,
		});

		return user;
	}
}

export default UserRepository;
