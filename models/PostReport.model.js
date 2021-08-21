module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define("report", {
        isReported: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return Report;
};