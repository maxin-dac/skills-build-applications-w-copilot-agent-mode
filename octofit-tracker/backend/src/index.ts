import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { activitiesRouter, leaderboardRouter, teamsRouter, usersRouter, workoutsRouter } from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

const startServer = async (): Promise<void> => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
