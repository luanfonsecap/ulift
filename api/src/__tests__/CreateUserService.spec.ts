import CreateUserService from '~/services/CreateUserService';
import FakeUserRepository from './fakes/FakeUserRepository';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;

describe('Create User Service', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		createUserService = new CreateUserService();
	});

	it('should be able to create a new user', async () => {
		const user = await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});
		console.log('a');

		expect(user).toHaveProperty('_id');
	});
});
