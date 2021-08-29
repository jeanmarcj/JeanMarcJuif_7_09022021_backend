// This file is a coded from scratch. It is not used for the app to start.
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// DB
const db = require('./app/models');
// In production mode
// db.sequelize.sync();

// In development, drop existings tables and re-sync database.
// db.sequelize.sync({ force: true }).then (() => {
//     console.log("Drop & re-sync db.");
// }).catch(error => {
//     console.error("Wrong database credentials ?");
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;