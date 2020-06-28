import { Document } from 'mongoose';

export default interface IUniversity extends Document {
	institution: string;
	campus: string;
}
