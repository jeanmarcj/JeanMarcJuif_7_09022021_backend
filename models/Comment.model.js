module.exports = (sequelize, Sequelize) => {
    const PostComment = sequelize.define("postComment", {
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        published: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

    return PostComment;
};