let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// import CommentModel from './Comment'

let BlogSchema = new Schema({
  title: String,
  author: String,
  context: String,
  // comments: [CommentModel],
    createTime: {type: Date, default: Date.now},
});


module.exports = mongoose.model('BlogModel', BlogSchema);