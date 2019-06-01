let express = require('express');
let BlogModel = require('../models/Blog.js');
let router = express.Router();

module.exports = router;

router.all((req, res, next) => {
    console.log("request receive time: " + new Date().toDateString());
    next();
});

router.get('/blog-list', (req, res) => {
    BlogModel.find((err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.json(blogs);
        }
    });
});

router.get('/blog-view/:id', (req, res) => {
    BlogModel.findById(req.params.id, (err, blog) => {
        if (err) {
            console.log(err);
        } else {
            res.json(blog);
        }
    })
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
//虽然用get可以，但是用delete可以吗？
router.route("/blog-delete/:id").delete((req, res) => {
    BlogModel.findByIdAndRemove({_id: req.params.id}, (err, todo) => {
        if (err) {
            res.json(err);
        } else {
            res.join("delete successfully!");
        }
    })
});

