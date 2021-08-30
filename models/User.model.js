const Post = require('./Post.model');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING(50),
            defaultValue: null
        },
        lastName: {
            type: Sequelize.STRING(50),
            defaultValue: null
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        passwordHash: {
            type: Sequelize.STRING(100)
        },
        passwordPlainText: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        registeredAT: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isOnline: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

    return User;
};