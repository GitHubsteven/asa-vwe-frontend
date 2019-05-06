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


const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, 'index.html'),
  compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(router);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

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
})