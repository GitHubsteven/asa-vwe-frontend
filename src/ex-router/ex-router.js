let express = require('express');
let BlogModel = require('../models/Blog.js');
let router = express.Router();

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

router.route('/blog-create').post((request, response) => {
  console.log(request.body);
  let blog = new BlogModel();
  if (request.body) {
    blog.title = request.body.title;
    blog.context = request.body.context;
  }
  blog.save().then((blog) => {
    console.log("----------> create successfully");
    response.status(200).json(blog);
  }).catch((err) => {
    response.status(400).send("error when saving to MongoDB");
  })
});
