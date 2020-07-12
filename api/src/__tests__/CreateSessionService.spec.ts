import CreateUserService from '~/services/CreateUserService';
import CreateSessionService from '~/services/CreateSessionService';
import FakeUserRepository from './fakes/FakeUserRepository';
import AppError from '~/errors/AppError';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let createSessionService: CreateSessionService;

describe('Create Session Service', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		createUserService = new CreateUserService(fakeUserRepository);
		createSessionService = new CreateSessionService(fakeUserRepository);
	});

	it('should be able to authenticate a user', async () => {
		await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		const auth = await createSessionService.execute('luan@email.com', '123123');

		expect(auth).toHaveProperty('token');
		expect(auth).toHaveProperty('user');
		expect(auth.user.username).toEqual('Luan');
	});

	it('should not be able to authenticate a user with wrong password', async () => {
		await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		await expect(
			createSessionService.execute('luan@email.com', 'wrong-password'),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate a user with wrong e-mail', async () => {
		await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		await expect(
			createSessionService.execute('wrong-email', '123123'),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be possible to authenticate a user that does not exist', async () => {
		await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		await expect(
			createSessionService.execute('non-existing-email', 'password'),
		).rejects.toBeInstanceOf(AppError);
	});
});
