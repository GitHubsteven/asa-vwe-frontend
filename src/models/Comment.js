let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    author: String,
    context: String,
    email: String,
    createTime: {type: Date, default: Date.now},
});


module.exports = mongoose.model('CommentModel', CommentSchema);