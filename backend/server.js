import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ name: '0S1NT-M4P API' });
});

app.use('/api', routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`0S1NT-M4P backend listening on port ${PORT}`);
});
