import express from 'express';
import prisma from './prisma';
import redis from './redis';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
  const cachedUsers = await redis.get('users');
  if (cachedUsers) {
    return res.json(JSON.parse(cachedUsers));
  }

  const users = await prisma.user.findMany();
  await redis.set('users', JSON.stringify(users), 'EX', 10);
  res.json(users);
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
