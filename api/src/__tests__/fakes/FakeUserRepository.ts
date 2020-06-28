import crypto from 'crypto';

import AppError from '~/errors/AppError';
import IUserRepositories from '~/repositories/interfaces/IUserRepository';
import ICreateUserDTO from '~/repositories/dtos/ICreateUserDTO';
import IUser from '~/schemas/interfaces/IUser';

interface IFakeUser {
	id: crypto.Hash;
	username: string;
	email: string;
	password: string;
	defaultDestination: string;
}

class UserRepository {
	private users: IFakeUser[] = [];

	public async create({
		username,
		email,
		password,
		defaultDestination,
	}: ICreateUserDTO): Promise<IUser> {
		const user = {
			id: crypto.createHash('sha256'),
			username,
			email,
			password,
			defaultDestination,
		};

		this.users.push(user);

		return user as IUser;
	}

	// public async update(user: IUser): Promise<IUser> {
	// 	const updatedUser = await User.findByIdAndUpdate(user._id, user);

	// 	if (!updatedUser) {
	// 		throw new AppError('User not found', 404);
	// 	}

	// 	return updatedUser;
	// }

	// public async delete(id: string): Promise<void> {
	// 	await User.deleteOne({ _id: id });
	// }

	// public async findById(id: string): Promise<IUser | null> {
	// 	const user = User.findById(id);

	// 	return user;
	// }

	// public async findByEmail(email: string): Promise<IUser | null> {
	// 	const user = await User.findOne({ email });

	// 	return user;
	// }
}

export default UserRepository;
