import AppError from '../errors/AppError';
import IUserRepository from '../repositories/interfaces/IUserRepository';
import HashProvider from '../providers/implementations/HashProvider';
import TokenProvider from '../providers/implementations/TokenProvider';
import IUser from '../schemas/interfaces/IUser';

interface IResponse {
	token: string;
	user: IUser;
}

class CreateUserService {
	private userRepository: IUserRepository;

	constructor(repository: IUserRepository) {
		this.userRepository = repository;
	}

	public async execute(email: string, password: string): Promise<IResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new AppError('This user doest not exists');
		}

		const hashProvider = new HashProvider();

		const matchPassword = await hashProvider.compareHash(
			password,
			user.password,
		);

		if (!matchPassword) {
			throw new AppError('Incorrect e-mail or password  combination.', 401);
		}

		const tokenProvider = new TokenProvider();

		const token = tokenProvider.generateToken(user.id);

		return { token, user };
	}
}

export default CreateUserService;
