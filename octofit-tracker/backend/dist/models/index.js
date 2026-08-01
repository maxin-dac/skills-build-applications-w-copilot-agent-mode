"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    goal: { type: String, default: 'Stay active' },
    fitnessLevel: { type: String, default: 'Intermediate' },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
}, { timestamps: true });
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    notes: { type: String, default: '' },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, required: true },
}, { timestamps: true });
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, default: 'Beginner' },
    equipment: [{ type: String }],
    instructions: [{ type: String }],
    targetMuscleGroups: [{ type: String }],
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
