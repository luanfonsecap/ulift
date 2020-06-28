import mongoose, { Schema } from 'mongoose';

import IUniversity from './interfaces/IUniversity';

const UniversitySchema = new Schema(
	{
		institution: String,
		campus: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<IUniversity>('University', UniversitySchema);
