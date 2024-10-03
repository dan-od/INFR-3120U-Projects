let express = require('express');
let app = express();
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Database Configuration
let mongoose = require('mongoose');
let dbConfig = require('./db'); // Renamed from DB
mongoose.connect(dbConfig.URI);
let db = mongoose.connection; // Renamed from mongoDB
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => { console.log("MongoDB is connected") });

// Routes
let indexRoute = require('../routes/index'); // Renamed from indexRouter
let userRoute = require('../routes/users'); // Renamed from usersRouter
let bookRoute = require('../routes/bio_books'); // Renamed from BooksRouter



app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/bookslist', BookRoute);

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
  res.render('error',{title:'Error'});
});

module.exports = app;