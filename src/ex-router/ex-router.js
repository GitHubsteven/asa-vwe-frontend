let express = require('express');

let router = express.Router();

router.get('/blog-list', (req, res, next) => {
  let blog1 = {
    id:1,
    title: 'blog1',
    context: "hello,world",
    author: 'rb.x',
    createTime: '2019-05-06 12:00'
  };
  let blog2 = {
    id:2,
    title: 'blog2',
    context: "hello,world2",
    author: 'rb.x',
    createTime: '2019-05-06 21:00'
  };
  let blogs = [blog1, blog2];
  res.send(JSON.stringify(blogs));
});

module.exports = router;