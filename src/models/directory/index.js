import mongoose, { Schema, mongo } from 'mongoose';
import BaseDAO from '../baseDAO';

export class Rank extends BaseDAO {
  static _model = mongoose.model('Rank', new Schema({
    userId: String,
    score: Number,
  }));
}

export default class DirectoryDAO extends BaseDAO {
  static _model = mongoose.model('Directory', new Schema({
    name: String,
    slug: String,
    ranking: { type: Schema.ObjectId, ref: 'Rank' },
    course: String,
  }));
}
