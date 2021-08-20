const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

console.log('Initialisation de Sequelize !');
// Sequilize init
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: 3307,
    dialect: dbConfig.dialect,

    pool : {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.authenticate()
.then(() => {
    console.log('Connected to the Database (models/index.js) !');
})
.catch(err => {
    console.log('Unable to connect to the database : ', err);
})

// db.users = users will be the table's name in the MySql DB
db.users = require('./User.model')(sequelize, Sequelize);
db.posts = require('./Post.model')(sequelize, Sequelize);
db.postComments = require('./Comment.model')(sequelize, Sequelize);

//Association One-to-hasMany
// One user has many posts
// We use hasMany() to help one Tutorial have many Comments, and belongsTo() to indicate that one Comment only belongs to one Tutorial.

db.users.hasMany(db.posts, { as: "posts" });
db.posts.belongsTo(db.users, {
    foreignKey: "authorId", as: "user"
});

// One user has many Comments
// One post has many postComments
// Comment belongs to one post
db.users.hasMany(db.postComments, { as: "comments" });
db.posts.hasMany(db.postComments, { as: "comments" });
db.postComments.belongsTo(db.posts, {
    foreingnKey: "postId", as: "post"
});
db.postComments.belongsTo(db.users, {
    foreingnKey: "userId", as: "user"
})

module.exports = db;