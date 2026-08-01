import { Schema, model, type Document, type Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  goal: string;
  fitnessLevel: string;
  teamId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    goal: { type: String, default: 'Stay active' },
    fitnessLevel: { type: String, default: 'Intermediate' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);

export interface ITeam extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Team = model<ITeam>('Team', teamSchema);

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  notes?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    notes: { type: String, default: '' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = model<IActivity>('Activity', activitySchema);

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  teamId: Types.ObjectId;
  points: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);

export interface IWorkout extends Document {
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: string;
  equipment: string[];
  instructions: string[];
  targetMuscleGroups: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, default: 'Beginner' },
    equipment: [{ type: String }],
    instructions: [{ type: String }],
    targetMuscleGroups: [{ type: String }],
  },
  { timestamps: true },
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
