import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Chen', email: 'ava@example.com', goal: 'Run a 10K', fitnessLevel: 'Intermediate' },
      { name: 'Marcus Lee', email: 'marcus@example.com', goal: 'Build strength', fitnessLevel: 'Advanced' },
      { name: 'Nia Brooks', email: 'nia@example.com', goal: 'Improve mobility', fitnessLevel: 'Beginner' },
    ]);

    const teamOne = await Team.create({
      name: 'Peak Performers',
      description: 'A team focused on endurance and consistency.',
      members: [users[0]._id, users[1]._id],
      points: 1280,
    });

    const teamTwo = await Team.create({
      name: 'Momentum Squad',
      description: 'A balanced team that loves strength and recovery.',
      members: [users[2]._id],
      points: 940,
    });

    await User.findByIdAndUpdate(users[0]._id, { teamId: teamOne._id });
    await User.findByIdAndUpdate(users[1]._id, { teamId: teamOne._id });
    await User.findByIdAndUpdate(users[2]._id, { teamId: teamTwo._id });

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 35,
        caloriesBurned: 420,
        notes: 'Morning jog',
        date: new Date('2026-07-28T07:00:00.000Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 560,
        notes: 'Upper body split',
        date: new Date('2026-07-29T18:30:00.000Z'),
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 220,
        notes: 'Recovery flow',
        date: new Date('2026-07-30T06:45:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, teamId: teamOne._id, points: 1280, rank: 1 },
      { userId: users[1]._id, teamId: teamOne._id, points: 1180, rank: 2 },
      { userId: users[2]._id, teamId: teamTwo._id, points: 940, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run',
        category: 'Cardio',
        durationMinutes: 35,
        difficulty: 'Intermediate',
        equipment: ['Running shoes'],
        instructions: ['Warm up for 5 minutes', 'Run 3 intervals at tempo pace'],
        targetMuscleGroups: ['Legs', 'Cardio'],
      },
      {
        title: 'Power Circuit',
        category: 'Strength',
        durationMinutes: 40,
        difficulty: 'Advanced',
        equipment: ['Dumbbells', 'Bench'],
        instructions: ['Complete 3 rounds', 'Rest 45 seconds between rounds'],
        targetMuscleGroups: ['Full body'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
