import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
