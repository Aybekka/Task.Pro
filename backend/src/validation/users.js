import Joi from 'joi';
import { MAX_AVATAR_LENGTH } from '../constants/index.js';

export const updateMeSchema = Joi.object({
  name: Joi.string().min(2).max(32),
  email: Joi.string().email(),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/^\S+$/, 'no spaces')
    .pattern(/[A-Z]/, 'uppercase letter')
    .pattern(/[0-9]/, 'digit'),
  avatarUrl: Joi.string().max(MAX_AVATAR_LENGTH).allow(null),
});
