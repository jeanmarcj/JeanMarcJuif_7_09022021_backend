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

db.users = require('./User.model')(sequelize, Sequelize);
db.posts = require('./Post.model')(sequelize, Sequelize);
db.postComments = require('./Comment.model')(sequelize, Sequelize);
db.postsReport = require('./PostReport.model')(sequelize, Sequelize);
db.postsLikes = require('./PostLike.model')(sequelize, Sequelize);

/**
 * Tables Associations
 */

/* USERS */
// One user has many posts - One-to-Many
// We use hasMany() to help one User have many Posts, and belongsTo() to indicate that one Comment only belongs to one User.

db.users.hasMany(db.posts, { as: "posts" });
db.posts.belongsTo(db.users, { foreignKey: "authorId", as: "user" });

/* COMMENTS */
// One user has many Comments - One to many
db.users.hasMany(db.postComments, { as: "comments" });
db.postComments.belongsTo(db.users, { foreingnKey: "userId", as: "user" });

// One post has many Comments
// Comments belongs to one post
db.posts.hasMany(db.postComments, { as: "comments" });
db.postComments.belongsTo(db.posts, {
    foreingnKey: "postId", as: "post"
});

/* REPORTS */
// One Post has many Reports - One to Many
db.posts.hasMany(db.postsReport, {
    as: "reports",
    onDelete: 'CASCADE'
});
// Reports belongs to one post to indicate that one Report only belongs to one Post
db.postsReport.belongsTo(db.posts, { foreingnKey: "postId", as: "post"} ); // Will add postId to postsReport

// Reports belongs to one User. One User report one Post
db.postsReport.belongsTo(db.users); // Will add userId to reports

/* LIKES/DISLIKES */
//On Post has many Likes/Dislikes - One to Many
db.posts.hasMany(db.postsLikes, { as: "likes" });
// Likes belongs to one post to indicate that one Like only belongs to one Post
db.postsLikes.belongsTo(db.posts); // Will add userId to postsLikes

// Likes belongs to one User.
db.postsLikes.belongsTo(db.users); // Will add userId to postsLikes


//db.users db.posts db.postsLikes

module.exports = db;