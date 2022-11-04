import 'express-async-errors';

import cors from 'cors';
import db from './db/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import express from 'express';
import morgan from 'morgan';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import router from './route/index.js';

const corsOptions = {
  origin: '*',
};

export const startServer = async port => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  app.use(express.json());

  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  await db.sequelize.sync({ force: false });

  const server = app.listen(port, () =>
    console.log(`server start PORT:${port}`)
  );

  return server;
};
