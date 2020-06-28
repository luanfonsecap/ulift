import IUniversittyRepository from '../interfaces/IUniversittyRepository';
import ICreateUniversityDTO from '../dtos/ICreateUniversityDTO';
import University from '../../schemas/University';
import IUniversity from '../../schemas/interfaces/IUniversity';
import AppError from '../../errors/AppError';

class UniversityRepository implements IUniversittyRepository {
	public async create({
		institution,
		campus,
	}: ICreateUniversityDTO): Promise<IUniversity> {
		const university = await University.create({
			institution,
			campus,
		});

		return university;
	}

	public async update(
		id: string,
		{ institution, campus }: IUniversity,
	): Promise<IUniversity> {
		const updatedUniversity = await University.findByIdAndUpdate(id, {
			institution,
			campus,
		});

		if (!updatedUniversity) {
			throw new AppError('University id not found', 404);
		}

		return updatedUniversity;
	}

	public async delete(id: string): Promise<void> {
		await University.deleteOne({ _id: id });
	}

	public async findByCampus(campus: string): Promise<IUniversity | null> {
		const university = await University.findOne({ campus });

		return university;
	}

	public async findByInstitution(
		institution: string,
	): Promise<IUniversity | null> {
		const university = await University.findOne({ institution });

		return university;
	}
}

export default UniversityRepository;
