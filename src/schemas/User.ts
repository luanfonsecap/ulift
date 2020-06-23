import mongoose, { Schema } from 'mongoose';

import HashProvider from '../providers/implementations/HashProvider';
import IUser from './interfaces/IUser';

const UserSchema = new Schema({
	username: String,
	email: String,
	password: String,
	defaultDestination: String,
});

UserSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();

	const hashProvider = new HashProvider();

	const hashedPassword = await hashProvider.generateHash(this.password);

	this.password = hashedPassword;
	return next();
});

export default mongoose.model<IUser>('User', UserSchema);
