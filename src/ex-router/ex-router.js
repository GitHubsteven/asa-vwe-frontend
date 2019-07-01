/* eslint-disable no-console */
let express = require('express');
let BlogModel = require('../models/Blog.js');
let CommentModel = require('../models/Comment');
let router = express.Router();

module.exports = router;

router.all("/*", (req, res, next) => {
  console.log("request receive time: " + new Date().toDateString());
  next();
});

router.post('/blog-list', (req, res) => {
  let params = {};
  let searchOpt = req.body;
  console.log(req.body);
  if (searchOpt.title) {
    params = {
      title: {$regex: searchOpt.title}
    };
  }
  let data = {
    count: 0,
    items: []
  };
  BlogModel.estimatedDocumentCount(params, (err, count) => {
    if (err) {
      return res.status(500);
    } else {
      data.count = count;

      BlogModel.find(params)
        .skip((searchOpt.curPage - 1) * searchOpt.pageSize)
        .limit(searchOpt.pageSize)
        .exec((err, blogs) => {
          if (err) {
            console.log(err);
            return res.status(500);
          } else {
            data.items = blogs;
            res.json(data);
          }
        });
    }
  })
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
  let blog = new BlogModel();
  if (request.body) {
    Object.assign(blog, request.body)
  }
  blog.save().then((blog) => {
    response.status(200).json(blog);
  }).catch((err) => {
    response.status(400).send("error when saving to MongoDB");
  })
});
router.route("/blog-delete/:id").delete((req, res) => {
  BlogModel.findByIdAndRemove({_id: req.params.id}, {useFindAndModify: true}, (err, todo) => {
    if (err) {
      res.json(err);
    } else {
      res.json("delete successfully!");
    }
  })
});

//更新博客
router.route("/blog-update/:id").put((req, res) => {
  BlogModel.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: true}, (err, todo) => {
    if (err) {
      res.json(err)
    } else {
      res.json(todo);
    }
  })
});

/**
 * 根据blogId获取blog下的所有评论
 */
router.get("/blog-comments/:blogId", (req, resp) => {
  CommentModel.find({blogId: req.params.blogId}, (err, comments) => {
    if (err) {
      return resp.status(500).json(err);
    } else {
      comments = comments || [];
      if (comments.length === 0) return resp.json(comments);
      return resp.json(divideComment(comments));
    }
  });
});

/**
 * 添加博客评论
 */
router.post("/comments-create/", (req, resp) => {
  let requestBody = req.body;
  console.log(requestBody);
  let comment = new CommentModel();
  if (!requestBody) {
    return resp.status(200).json("comment不能为空")
  }
  Object.assign(comment, requestBody);
  comment.save().then((com) => {
    return resp.json(com);
  }).catch((err) => {
    console.log(err);
    return resp.status(500).json(err);
  })
});

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

function divideComment(comments) {
  if (comments.length === 0) return;
  let refIds2CommentsMap = groupBy(comments, (ele) => ele.refId);
  let firstLayerComments = refIds2CommentsMap.get(null);
  debugger;
  for (let refId of refIds2CommentsMap.keys()) {
    if (!refId || refId === "null") continue;
    let refIdComments = firstLayerComments.filter(item => {
      return refId === item._id;
    });
    let parentComment = refIdComments[0];
    parentComment.subComments = refIds2CommentsMap.get(refId) || [];
  }
  return firstLayerComments;
}