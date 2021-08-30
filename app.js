var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

var corsOptions = {
    origin: "http://localhost:8080",
    credentials: true,
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/postsComments');
var reportsRouter = require('./routes/postsReports');
var likesRouter = require('./routes/postsLikes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));

// Database
const db = require('./models/index');
// In production mode
// db.sequelize.sync();

// In development mode - Active to sync models with DB
// db.sequelize.sync({
//     force: true
// }).then(() => {
//     console.log("Drop and re-sync db !");
// });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/reports', reportsRouter);
app.use('/likes', likesRouter);

module.exports = app;
