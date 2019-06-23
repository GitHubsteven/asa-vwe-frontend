let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    author: String,
    context: String,
    blogId: String,
    email: String,
    refId: String,
    createTime: {type: Date, default: Date.now},
});


module.exports = mongoose.model('CommentModel', CommentSchema);