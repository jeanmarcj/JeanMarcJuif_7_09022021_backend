module.exports = (sequelize, Sequelize) => {
    const PostLike = sequelize.define("postLikes", {
        isLiked: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isDisliked: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return PostLike;
};