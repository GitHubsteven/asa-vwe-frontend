let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  email: String,
  password: {type: String, default: ""},
  role: {type: String, default: "user"},
  createTime: {type: Date, default: Date.now},
  creator: {type: String, default: "admin"},
  modifiedTime: {type: Date, default: Date.now},
  modifier: {type: String, default: "admin"}
});


module.exports = mongoose.model('UserModel', UserSchema);