import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewaresUser from './middlewares/tokenMiddleware';

import * as middlewares from './middlewares';
import frisbee from './api/frisbee';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});

app.use(middlewaresUser.tokenMiddleware);

app.use('/api/v1/frisbee', frisbee);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
