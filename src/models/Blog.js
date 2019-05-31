let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// import CommentModel from './Comment'

let BlogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  // comments: [CommentModel],
  date: {type: Date, default: Date.now},
});


module.exports = mongoose.model('BlogModel', BlogSchema);