var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database
const db = require('./models/index');
// In production mode
// db.sequelize.sync();

// In development mode - Active to sunc models with DB
// db.sequelize.sync({
//     force: true
// }).then(() => {
//     console.log("Drop and re-sync db !");
// });


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
