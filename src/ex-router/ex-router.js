let express = require('express');
let BlogModel = require('../models/Blog.js');
let router = express.Router({caseSensitive: false, mergeParams: false, strict: false});

module.exports = router;

router.all((req, res, next) => {
  console.log("request receive time: " + new Date().toDateString());
  next();
});

router.get('/blog-list', (req, res) => {
  res.send(JSON.stringify({}));
});

router.get('/blog-view', (req, res) => {
  res.send(JSON.stringify({}));
});

router.route('/blog-create').post((req, res) => {
  console.log(req.body);
  let blog = new BlogModel();
  if (req.body) {
    blog.title = req.body.title;
    blog.context = req.body.context;
  }
  blog.save().then((blog) => {
    console.log("----------> create successfully");
    res.status(200).json(blog);
  }).catch((err) => {
    res.status(400).send("error when saving to MongoDB");
  })
});
