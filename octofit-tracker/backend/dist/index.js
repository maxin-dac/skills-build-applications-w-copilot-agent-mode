"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
exports.app.use('/api/users', routes_1.usersRouter);
exports.app.use('/api/teams', routes_1.teamsRouter);
exports.app.use('/api/activities', routes_1.activitiesRouter);
exports.app.use('/api/leaderboard', routes_1.leaderboardRouter);
exports.app.use('/api/workouts', routes_1.workoutsRouter);
