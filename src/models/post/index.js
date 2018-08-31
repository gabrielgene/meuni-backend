import mongoose, { Schema, mongo } from 'mongoose';
import BaseDAO from '../baseDAO';

export default class PostDAO extends BaseDAO {
  static _model = mongoose.model('Post', new Schema({
    name: String,
    user: String,
    avatarUrl: String,
    text: String,
    folder: String,
    folderName: String,
    likes: Number,
    comments: Number,
  }));
}
