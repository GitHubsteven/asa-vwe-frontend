import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'

let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
import router from '../ex-router/ex-router';

//链接数据库
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');


const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, 'index.html'),
  compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

//服务器连接数据库
let DB_URL = "mongodb://localhost:27017/blogs";
mongoose.connect(DB_URL, {useNewUrlParser: true, useCreateIndex: true})
  .then(() => {
      console.log("connect successfully!")
    }, (err) => {
      console.log('error when connect to mongo db!' + err)
    }
  );

mongoose.set('useFindAndModify', false);

//表示数据格式以json方式来传递？
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// app.use(logger('dev'));
app.use(cookieParser());
app.use(router);

app.use(webpackHotMiddleware(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

app.use('/public', express.static('public'));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8090;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
});