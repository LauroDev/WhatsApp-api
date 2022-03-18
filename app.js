var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
var indexRouter = require('./routes/index');
var app = express();
const venom = require('venom-bot');
const { response } = require('express');
const mensagemController = require('./controllers/mensageController');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
global.url = path.resolve(path.join(__dirname, 'public'));

venom
.create({
    session: 'sice', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
})
.then((client) => {
  start(client);
    client.onMessage(message => {
      mensagemController.envio(message);
      // console.log(message);
    });
})
.catch((erro) => {
    console.log(erro);
});

function start(client) {
  global.cliente = client;
}

app.use('/' , indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
