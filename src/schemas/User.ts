import mongoose, { Schema } from 'mongoose';
import { hash } from 'bcryptjs';

import IUser from './interfaces/IUser';

const UserSchema = new Schema({
	username: String,
	email: String,
	password: String,
	defaultDestination: String,
});

UserSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();

	const hashedPassword = await hash(this.password, 8);

	this.password = hashedPassword;
	return next();
});

export default mongoose.model('User', UserSchema);
