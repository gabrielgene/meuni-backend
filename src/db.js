import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = global.Promise;

export const connectDB = () => {
  mongoose.connect(config.MONGO_URL, { useNewUrlParser: true }, err => (
    err ? console.error(`Mongo error: ${err}`) : console.warn('Mongo connected'))
  );
};
