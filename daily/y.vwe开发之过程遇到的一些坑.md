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

3. 打包生成的文件过大
执行npm run build在生成文件的过程中，会出现警报如下
```
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  main.js (1.05 MiB)
```
解决方案1(流氓方法，强行忽略)：
```
performance: {
        hints: true,
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    }
```

解决方案2：https://www.jianshu.com/p/35a0998746fa

