import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export async function updateMe(userId, data) {
  const update = { ...data };

  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  } else {
    delete update.password;
  }

  if (update.email) {
    const existing = await UsersCollection.findOne({
      email: update.email.toLowerCase(),
      _id: { $ne: userId },
    });
    if (existing) {
      throw createHttpError(409, 'An account with this email already exists.');
    }
  }

  const user = await UsersCollection.findByIdAndUpdate(userId, update, { new: true });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
}
