export default class BaseDAO {
  static _model = {};

  static create(args) {
    return this._model.create(args);
  }

  static find(args) {
    return this._model.find(args).exec();
  }

  static findOne(args) {
    return this._model.findOne(args).exec();
  }

  static findById(id) {
    return this._model.findOne({ _id: id }).exec();
  }

  static update(id, args) {
    return this._model.update({ _id: id }, { $set: args });
  }

  static bulkUpdate(ids, args) {
    return this._model.update({ _id: { $in: ids } }, { $set: args }, { multi: true });
  }

  static remove(args) {
    return this._model.find(args).remove().exec();
  }

  static pagination(args, skip, limit) {
    return this._model.find(args).skip(skip).limit(limit).exec();
  }
}
