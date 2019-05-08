let express = require('express');
let router = express.Router();

let blog_context = "#### test markdown ####\n" +
  "\n" +
  "```\n" +
  "test markdown code show\n" +
  "```\n" +
  "1. test list1\n" +
  "2. test list2\n" +
  "3. test list3\n" +
  "\n" +
  "> Dorothy followed her through many of the beautiful rooms in her castle.\n" +
  ">\n" +
  "> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.\n" +
  "\n" +
  "1. First item\n" +
  "2. Second item\n" +
  "3. Third item\n" +
  "    1. Indented item\n" +
  "    2. Indented item\n" +
  "4. Fourth item\n"

let blog1 = {
    id: 1,
    title: 'blog1',
    context: blog_context,
    author: 'rb.x',
    createTime: '2019-05-06 12:00'
};
let blog2 = {
    id: 2,
    title: 'blog2',
    context: "hello,world2",
    author: 'rb.x',
    createTime: '2019-05-06 21:00'
};
router.get('/blog-list', (req, res, next) => {
    let blogs = [blog1, blog2];
    res.send(JSON.stringify(blogs));
});

router.get('/blog-view', (req, res, next) => {
    res.send(JSON.stringify(blog1));
});


module.exports = router;