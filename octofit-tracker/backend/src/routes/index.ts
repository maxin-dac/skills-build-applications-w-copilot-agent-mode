import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

export const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users', error });
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create user', error });
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch user', error });
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Unable to update user', error });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete user', error });
  }
});

export const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch teams', error });
  }
});

teamsRouter.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create team', error });
  }
});

teamsRouter.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch team', error });
  }
});

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('userId').sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch activities', error });
  }
});

activitiesRouter.post('/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create activity', error });
  }
});

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find().populate('userId').populate('teamId').sort({ points: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leaderboard', error });
  }
});

leaderboardRouter.post('/', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create leaderboard entry', error });
  }
});

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch workouts', error });
  }
});

workoutsRouter.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create workout', error });
  }
});
