var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var dbMongo = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var estudiantesRouter = require('./routes/estudiantes');
var cursosRouter = require('./routes/cursos');
var jugadorRouter = require('./routes/jugadores');
var equiposRouter = require('./routes/equipos');
var registrosRouter = require('./routes/registros');

var app = express();
app.use(bodyparser.json());
dbMongo();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/estudiantes', estudiantesRouter);
app.use('/cursos', cursosRouter);
app.use('/jugadores', jugadorRouter);
app.use('/equipos', equiposRouter);
app.use('/registros', registrosRouter);

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
