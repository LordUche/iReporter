import dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}
app.use('/api/v1', routes);
app.all('*', (req, res) => res.status(404).json({ status: 404, error: 'That route does not exist on this server' }));
app.use((err, req, res, next) => res.status(400).json({ status: 400, error: err.message }));
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}...`);
});

export default app;
