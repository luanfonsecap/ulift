import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';
import AppError from './errors/AppError';
import YupValidationError from './errors/YupValidationError';

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://127.0.0.1:27018/ulift');

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	if (err instanceof YupValidationError) {
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	// eslint-disable-next-line no-console
	console.warn(err);

	return res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('🔥️ Server running...'));
