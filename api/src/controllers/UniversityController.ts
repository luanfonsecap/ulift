import { Request, Response } from 'express';

import University from '../schemas/University';

class UniversityController {
	async index(req: Request, res: Response): Promise<Response> {
		const universities = await University.find();

		return res.json(universities);
	}
}

export default new UniversityController();
