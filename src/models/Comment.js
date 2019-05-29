let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
  author: String,
  body: String,
  email: String,
  date: {type: Date, default: Date.now},
});


module.exports = mongoose.model('CommentModel', CommentSchema);