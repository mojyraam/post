var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cascadeRouter = require('./routes/cascade');
//monitor
var monitorRouter = require('./routes/monitor/monitor');
var createMonitorRouter = require('./routes/monitor/createMonitor');
var deleteMonitorRouter = require('./routes/monitor/deleteMonitor');
var editMonitorRouter = require('./routes/monitor/editMonitor');
//dcserver
var dcserverRouter = require('./routes/dcserver/dcserver');
var createDcserverRouter = require('./routes/dcserver/createDcserver');
// var deleteDcserverRouter = require('./routes/dcserver/deleteDcserver');
// var editDcserverRouter = require('./routes/dcserver/editDcserver');

var app = express();

// Passport config
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/editMonitor', express.static('public'));
app.use('/users', express.static('public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cascade', cascadeRouter);
//monitor
app.use('/monitor', monitorRouter);
app.use('/createMonitor', createMonitorRouter);
app.use('/deleteMonitor', deleteMonitorRouter);
app.use('/editMonitor', editMonitorRouter);
//dcserver
app.use('/dcserver', dcserverRouter);
app.use('/createDcserver', createDcserverRouter);
// app.use('/edicDcserver', editDcserverRouter);
// app.use('/deleteDcserver', deleteDcserverRouter);

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
