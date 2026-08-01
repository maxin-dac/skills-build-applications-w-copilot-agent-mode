import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose.connection;

export const connectDatabase = async (): Promise<void> => {
  if (db.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`Connected to MongoDB at ${connectionString}`);
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    throw error;
  }
};

db.on('error', console.error.bind(console, 'connection error:'));

export default db;
