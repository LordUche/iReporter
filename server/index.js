import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes';

const PORT = process.env.PORT || 3000;
const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());
server.use(logger('dev'));
server.use('/api/v1/', routes);
server.listen(PORT, () => {
  console.log(`App successfully started on port ${PORT}...`);
});

export default server;
