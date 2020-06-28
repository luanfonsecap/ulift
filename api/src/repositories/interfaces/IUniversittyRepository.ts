import ICreateUniversityDTO from '../dtos/ICreateUniversityDTO';
import IUniversity from '../../schemas/interfaces/IUniversity';

export default interface IUniversityRepository {
	create(data: ICreateUniversityDTO): Promise<IUniversity>;
	update(id: string, data: IUniversity): Promise<IUniversity>;
	delete(id: string): Promise<void>;
	findByInstitution(institution: string): Promise<IUniversity | null>;
	findByCampus(campus: string): Promise<IUniversity | null>;
}
