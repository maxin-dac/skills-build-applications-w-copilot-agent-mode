"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutsRouter = exports.leaderboardRouter = exports.activitiesRouter = exports.teamsRouter = exports.usersRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', async (_req, res) => {
    try {
        const users = await models_1.User.find().sort({ createdAt: -1 });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch users', error });
    }
});
exports.usersRouter.post('/', async (req, res) => {
    try {
        const user = await models_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create user', error });
    }
});
exports.usersRouter.get('/:id', async (req, res) => {
    try {
        const user = await models_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch user', error });
    }
});
exports.usersRouter.put('/:id', async (req, res) => {
    try {
        const user = await models_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to update user', error });
    }
});
exports.usersRouter.delete('/:id', async (req, res) => {
    try {
        const user = await models_1.User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to delete user', error });
    }
});
exports.teamsRouter = (0, express_1.Router)();
exports.teamsRouter.get('/', async (_req, res) => {
    try {
        const teams = await models_1.Team.find().populate('members');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch teams', error });
    }
});
exports.teamsRouter.post('/', async (req, res) => {
    try {
        const team = await models_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create team', error });
    }
});
exports.teamsRouter.get('/:id', async (req, res) => {
    try {
        const team = await models_1.Team.findById(req.params.id).populate('members');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch team', error });
    }
});
exports.activitiesRouter = (0, express_1.Router)();
exports.activitiesRouter.get('/', async (_req, res) => {
    try {
        const activities = await models_1.Activity.find().populate('userId').sort({ date: -1 });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch activities', error });
    }
});
exports.activitiesRouter.post('/', async (req, res) => {
    try {
        const activity = await models_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create activity', error });
    }
});
exports.leaderboardRouter = (0, express_1.Router)();
exports.leaderboardRouter.get('/', async (_req, res) => {
    try {
        const entries = await models_1.LeaderboardEntry.find().populate('userId').populate('teamId').sort({ points: -1 });
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch leaderboard', error });
    }
});
exports.leaderboardRouter.post('/', async (req, res) => {
    try {
        const entry = await models_1.LeaderboardEntry.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create leaderboard entry', error });
    }
});
exports.workoutsRouter = (0, express_1.Router)();
exports.workoutsRouter.get('/', async (_req, res) => {
    try {
        const workouts = await models_1.Workout.find().sort({ createdAt: -1 });
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch workouts', error });
    }
});
exports.workoutsRouter.post('/', async (req, res) => {
    try {
        const workout = await models_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create workout', error });
    }
});
