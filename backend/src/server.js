import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { connectMongo } from './db/connectMongo.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';
import { swaggerSpec } from './docs/swagger.js';
import router from './routers/index.js';

async function startServer() {
  await connectMongo();

  const app = express();

  app.use(express.json());
  app.use(cors({ origin: env('CLIENT_URL'), credentials: true }));
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(env('PORT', 3001));
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

startServer();
