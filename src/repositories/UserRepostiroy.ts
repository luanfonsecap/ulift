import IUserRepositories from './interfaces/IUserRepository';
import ICreateUserDTO from './dtos/ICreateUserDTO';
import User from '../schemas/User';
import IUser from '../schemas/interfaces/IUser';
import AppError from '../errors/AppError';

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

	public async update(user: IUser): Promise<IUser> {
		const updatedUser = await User.findByIdAndUpdate(user._id, user);

		if (!updatedUser) {
			throw new AppError('User not found', 404);
		}

		return updatedUser;
	}

	public async delete(id: string): Promise<void> {
		await User.deleteOne({ _id: id });
	}

	public async findById(id: string): Promise<IUser | null> {
		const user = User.findById(id);

		return user;
	}

	public async findByEmail(email: string): Promise<IUser | null> {
		const user = await User.findOne({ email });

		return user;
	}
}

export default UserRepository;
