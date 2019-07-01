let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
  author: String,
  context: String,
  blogId: String,
  email: String,
  refId: {type: String, default: "0"},
  remark: String,
  subComments: [], //不保存在数据库中
  createTime: {type: Date, default: Date.now},
  modifiedTime: {type: Date, default: Date.now}
});


module.exports = mongoose.model('CommentModel', CommentSchema);