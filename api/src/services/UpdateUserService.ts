import HashProvider from '../providers/implementations/HashProvider';
import IUpdateUserDTO from '../repositories/dtos/IUpdateUser';
import AppError from '../errors/AppError';
import IUserRepository from '~/repositories/interfaces/IUserRepository';
import IUser from '~/schemas/interfaces/IUser';

class UpdateUserService {
	private userRepository: IUserRepository;

	constructor(repository: IUserRepository) {
		this.userRepository = repository;
	}

	public async execute(
		id: string,
		{
			username,
			email,
			password,
			oldPassword,
			defaultDestination,
		}: IUpdateUserDTO,
	): Promise<IUser> {
		const hashProvider = new HashProvider();

		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		const userWithSameEmail = await this.userRepository.findByEmail(email);

		if (userWithSameEmail?.email && userWithSameEmail?.email !== email) {
			throw new AppError('E-mail address already in use');
		}

		if (password && !oldPassword) {
			throw new AppError('Old password is required to change current password');
		}

		if (password && oldPassword) {
			const checkOldPassword = await hashProvider.compareHash(
				oldPassword,
				user.password,
			);

			if (!checkOldPassword) {
				throw new AppError('Old password does not match.', 401);
			}

			user.password = await hashProvider.generateHash(password);
		}

		user.email = email;
		user.defaultDestination = defaultDestination;
		user.username = username;

		await this.userRepository.update(user);

		return user;
	}
}

export default UpdateUserService;
