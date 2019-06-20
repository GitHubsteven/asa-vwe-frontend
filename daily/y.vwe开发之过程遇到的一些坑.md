1.解决 vue 使用 element 时报错ERROR in ./node_modules/element-ui/lib/theme-chalk/fonts/element-icons.ttf

在 web pack.config.js 中加入这个依赖
```
{
    test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
    loader: 'file-loader'
}
```

2. vue-router页面跳转参数在帅新页面后消失的问题
当前传参的方式为：
```
 detail(blog) {
        this.$router.push({
          path: '/blog-view',
          name: 'BlogView',
          params: {
            blogId: blog._id
          }
        })
      },
```
获取参数：
```
 let id = this.$route.params.blogId;
```
改下如下的，那么就可以了,发送
```
 detail(blog) {
        this.$router.push({
          path: '/blog-view',
          name: 'BlogView',
          query: {
            blogId: blog._id
          }
        })
      },
```
获取参数：
```
 let id = this.$route.query.blogId;
```

3. this到底指的谁？

