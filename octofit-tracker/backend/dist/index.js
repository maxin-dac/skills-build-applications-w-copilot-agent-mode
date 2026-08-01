"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
app.use('/api/users', routes_1.usersRouter);
app.use('/api/teams', routes_1.teamsRouter);
app.use('/api/activities', routes_1.activitiesRouter);
app.use('/api/leaderboard', routes_1.leaderboardRouter);
app.use('/api/workouts', routes_1.workoutsRouter);
const startServer = async () => {
    await (0, database_1.connectDatabase)();
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
