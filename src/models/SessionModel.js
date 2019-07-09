let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SessionSchema = new Schema({
  sessionId: String,
  content: {type: String, default: ""},
  createTime: {type: Date, default: Date.now},
  creator: {type: String, default: "admin"},
  modifiedTime: {type: Date, default: Date.now},
  modifier: {type: String, default: "admin"}
});


module.exports = mongoose.model('SessionModel', SessionSchema);