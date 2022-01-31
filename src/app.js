import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

async function start() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors())

  app.use('/main', routes);

  await mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('MogoDB Conectado!')

  app.listen(process.env.CORE_PORT, () => {
    console.log('Servidor Rodando!');
  });
}

start();