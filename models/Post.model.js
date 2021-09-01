module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        authorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { // Post belongsTo User 1:1
                model: 'users',
                key: 'id'
            }
        },
        title: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        media: {
            type: Sequelize.STRING(128),
            defaultValue: null
        },
        content: {
            type: Sequelize.TEXT
        },
        slug: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        published: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        publishedAT: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    });

    return Post;
};