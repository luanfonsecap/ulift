import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUser from '../../schemas/interfaces/IUser';

export default interface IUserRepository {
	create(data: ICreateUserDTO): Promise<IUser>;
	update(data: IUser): Promise<IUser>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<IUser | null>;
	findByEmail(email: string): Promise<IUser | null>;
	// findByLocation(): Promise;
}
