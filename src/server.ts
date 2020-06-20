import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://127.0.0.1:27018/ulift');

app.use(cors());
app.use(express.json());
app.use(routes);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('🔥️ Server running...'));
