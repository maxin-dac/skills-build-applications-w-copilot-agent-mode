"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose_1.default.connection;
const connectDatabase = async () => {
    if (db.readyState === 1) {
        return;
    }
    try {
        await mongoose_1.default.connect(connectionString, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`Connected to MongoDB at ${connectionString}`);
    }
    catch (error) {
        console.error('Error connecting to octofit_db:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
db.on('error', console.error.bind(console, 'connection error:'));
exports.default = db;
