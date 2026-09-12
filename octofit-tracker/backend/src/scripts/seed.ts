import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/octofit.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        username: 'mayac',
        email: 'maya.chen@mergington.edu',
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Jordan Brooks',
        username: 'jbrooks',
        email: 'jordan.brooks@mergington.edu',
        fitnessLevel: 'beginner',
      },
      {
        name: 'Samira Patel',
        username: 'samirap',
        email: 'samira.patel@mergington.edu',
        fitnessLevel: 'advanced',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Mountain Movers',
        description: 'A team focused on steady progress and outdoor miles.',
        captainId: String(users[0]._id),
        memberIds: users.slice(0, 2).map((user) => String(user._id)),
      },
      {
        name: 'Campus Sprinters',
        description: 'Short, energetic workouts between classes.',
        captainId: String(users[2]._id),
        memberIds: [String(users[2]._id)],
      },
    ]);

    await Activity.insertMany([
      {
        userId: String(users[0]._id),
        teamId: String(teams[0]._id),
        type: 'running',
        duration: 32,
        distance: 4.8,
        points: 48,
        completedAt: '2026-09-10T16:30:00.000Z',
      },
      {
        userId: String(users[1]._id),
        teamId: String(teams[0]._id),
        type: 'strength training',
        duration: 25,
        points: 35,
        completedAt: '2026-09-11T15:45:00.000Z',
      },
      {
        userId: String(users[2]._id),
        teamId: String(teams[1]._id),
        type: 'cycling',
        duration: 45,
        distance: 12.5,
        points: 62,
        completedAt: '2026-09-11T17:15:00.000Z',
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: String(users[0]._id),
        username: users[0].username,
        teamId: String(teams[0]._id),
        points: 248,
        rank: 1,
        period: 'September 2026',
      },
      {
        userId: String(users[2]._id),
        username: users[2].username,
        teamId: String(teams[1]._id),
        points: 221,
        rank: 2,
        period: 'September 2026',
      },
      {
        userId: String(users[1]._id),
        username: users[1].username,
        teamId: String(teams[0]._id),
        points: 176,
        rank: 3,
        period: 'September 2026',
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Starter Strength Circuit',
        description: 'A 20-minute full-body circuit with bodyweight exercises.',
        type: 'strength',
        duration: 20,
        difficulty: 'beginner',
        targetUserId: String(users[1]._id),
      },
      {
        name: 'After-School Tempo Run',
        description: 'A paced run with warm-up and cool-down intervals.',
        type: 'running',
        duration: 35,
        difficulty: 'intermediate',
        targetUserId: String(users[0]._id),
      },
      {
        name: 'Power Ride',
        description: 'A challenging bike workout with three sprint intervals.',
        type: 'cycling',
        duration: 45,
        difficulty: 'advanced',
        targetUserId: String(users[2]._id),
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
