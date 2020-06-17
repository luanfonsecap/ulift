import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('🔥️ Server running...'));
