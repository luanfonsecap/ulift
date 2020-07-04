import DeleteUserService from '~/services/DeleteUserService';
import CreateUserService from '~/services/CreateUserService';
import FakeUserRepository from './fakes/FakeUserRepository';
import AppError from '~/errors/AppError';

let deleteUserService: DeleteUserService;
let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;

describe('Delete User Service', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		deleteUserService = new DeleteUserService(fakeUserRepository);
		createUserService = new CreateUserService(fakeUserRepository);
	});

	it('should be able to delete a user', async () => {
		const user = await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		const spy = jest.spyOn(fakeUserRepository, 'delete');
		await deleteUserService.execute(user.id);

		expect(spy).toHaveBeenCalled();
	});

	it('should not be able to delete a user that doest not exist', async () => {
		await expect(
			deleteUserService.execute('no-existing-id'),
		).rejects.toBeInstanceOf(AppError);
	});
});
