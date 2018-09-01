import mongoose, { Schema, mongo } from 'mongoose';
import BaseDAO from '../baseDAO';

export default class ReplyDAO extends BaseDAO {
  static _model = mongoose.model('Reply', new Schema({
    postId: String,
    comment: String,
    user: String,
    name: String,
    avatarUrl: String,
    likes: Number,
  }));
}
