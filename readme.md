
[参考资料链接:](https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334)

2019年4月26日

    曾经以为，express整合webpack通过在express中定义编译器来，就如下面的代码：

  ```
    // 引入模块
    let express = require('express');
    let webpack = require('webpack');
    let config = require('./webpack.dev.conf');

    //创建一个express后台实例
    let app = new express();
    //调用webpack并且传递配置
    let compiler = webpack(config);
    //使用webpack-dev-middleware中间件
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true,
        chunks: false
      }
    });

    app.use(devMiddleware);

    // 使用 webpack-hot-middleware 中间件
    var hotMiddleware = require('webpack-hot-middleware')(compiler)
    // 注册中间件
    app.use(hotMiddleware);

    // webpack插件，监听html文件改变事件
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        //发布事件
        hotMiddleware.publish({action: 'reload'});
        cb();
      })
    });

    let PORT = 8888;
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Listening at http://localhost:8888')
    });
  ```
  通过compiler来编译编译webpack的配置，实现前后端的整合，但是，在这个项目中，却没有通过这种方式来实现，而是通过了，webpack打包两个配置文件（服务端和客户端）
  来实现，对于通过express实现的服务端的js,作为webpack入口来打包实现，同时对于client端来说也是一样的

  脚本语言：
  ```
   "scripts": {
      "buildDev": "DEL /F /Q dist  & webpack --mode development --config webpack.server.config.js & webpack --mode development --config webpack.dev.config.js",
      "buildProd": "DEL /F /Q dist & webpack --mode production --config webpack.server.config.js & webpack --mode production --config webpack.prod.config.js ",
      "start": "node ./dist/server.js"
    },
  ```
  webpack.dev.config.js(client.js)
  ```
  const path = require("path")
  const webpack = require('webpack')
  const HtmlWebPackPlugin = require("html-webpack-plugin")
   entry: {
      main: './src/index.js'
    },
    //这是重点
     target: 'web',
    //其他代码
  ```
  webpack.server.config.js
  ```
  const path = require('path')
  const webpack = require('webpack')
  const nodeExternals = require('webpack-node-externals')
  module.exports = (env, argv) => {
    const SERVER_PATH = (argv.mode === 'production') ?
      './src/server/server-prod.js' :
      './src/server/server-dev.js';
    return ({
      entry: {
        server: SERVER_PATH,
      },
  //其他代码
  //重点代码
   target: 'node',
      node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
      },
      externals: [nodeExternals()], // Need this to avoid error when working with Express
  //其他代码
  ```
  注意server 和client的target和entry的不同，至于谁优谁劣，不好说，因为对前端我只是入门而已。那么他们是如何通过什么方式联系在一起了呢？
  对于express来说，它需要一个index.html作为静态资源入口，那么webpack就在约定好的地方生成一个index.html就可以了，
  不过接下来如何实现页面跳转暂时也不清楚。

 整个流程为：

 5. 为开发环境增加webpack development middleware，这样的话，修改html/js/ts等文件的话，webpack可以直接帮我们
 build，前端刷新页面就可以立马看到效果了。
 6. 但是我们不想刷页面，所以这里需要用到 Hot Module Reloading了。

    6.1 修改webpack.dev.config.js中的main -->为hmr的客户端，代码如下
    ```
       // main: './src/index.js'
        main: ['webpack-hot-middleware/client?path=__webpack_hmr$timeout=20000',
          './src/index.js']
    ```
    6.2 修改server-dev.js,
    ```
    //add code
    import webpackHotMiddleware from 'webpack-hot-middleware'
    //其他代码
    app.use(webpackHotMiddleware(compiler));
    ```
    6.3 修改入口 index.js
    ```
     if (typeof(module.hot) !== 'undefined') {
       module.hot.accept();  //eslint-disable-line no-undef
     }
    ```
    很遗憾，这里的热加载并没有发生（todo：解决这个问题）

  7. eslint code linting