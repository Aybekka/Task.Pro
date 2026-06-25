import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateMeSchema } from '../validation/users.js';
import { getMeController, updateMeController } from '../controllers/users.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Current user }
 *       401: { description: Not authenticated }
 */
router.get('/me', ctrlWrapper(getMeController));

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: Update the currently authenticated user's profile
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               avatarUrl: { type: string, nullable: true }
 *     responses:
 *       200: { description: Updated user }
 */
router.patch('/me', validateBody(updateMeSchema), ctrlWrapper(updateMeController));

export default router;
