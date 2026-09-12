import mongoose, { Schema } from 'mongoose';

const documentSchema = new Schema(
  {
    name: { type: String },
    username: { type: String },
    email: { type: String },
    description: { type: String },
    type: { type: String },
    duration: { type: Number },
    points: { type: Number },
    userId: { type: String },
    teamId: { type: String },
  },
  { timestamps: true, strict: false },
);

export const User = mongoose.models.User || mongoose.model('User', documentSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', documentSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', documentSchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', documentSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', documentSchema);