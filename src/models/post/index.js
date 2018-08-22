import mongoose, { Schema, mongo } from 'mongoose';
import BaseDAO from '../baseDAO';

export default class PostDAO extends BaseDAO {
  static _model = mongoose.model('Post', new Schema({
    postId: String,
    text: String,
    directory: String,
    userId: String,
  }));
}
