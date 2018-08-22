import mongoose, { Schema, mongo } from 'mongoose';
import BaseDAO from '../baseDAO';

export default class UserDAO extends BaseDAO {
  static _model = mongoose.model('User', new Schema({
    user: String,
    pass: String,
    name: String,
    image: String,
    course: String,
    age: Number,
    description: String,
    activities: [String],
    directories: [String],
  }));

  static async addDirectories(id, dirs) {
    const { directories } = await this.findById(id);
    return await this.update(id, { directories: [...directories, ...dirs] });
  }
}
