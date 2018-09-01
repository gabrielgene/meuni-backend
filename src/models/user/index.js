import mongoose, { Schema, mongo } from 'mongoose';
import BaseDAO from '../baseDAO';

export default class UserDAO extends BaseDAO {
  static _model = mongoose.model('User', new Schema({
    token: String,
    user: String,
    pass: String,
    name: String,
    avatarUrl: String,
    course: String,
    email: String,
    description: String,
    directories: [String],
  }));

  static async addDirectories(id, dirs) {
    const { directories } = await this.findById(id);
    return await this.update(id, { directories: [...directories, ...dirs] });
  }

  static async findCurrentUser(req) {
    const token = req.cookies.userId;
    if (token !== undefined) {
      return await this.findOne({ token });
    }
    return false;
  }
}
