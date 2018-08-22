import mongoose, { Schema, mongo } from 'mongoose';
import BaseDAO from '../baseDAO';

export default class CommentDAO extends BaseDAO {
  static _model = mongoose.model('Comment', new Schema({
    postId: String,
    text: String,
    directory: String,
  }));
}
