module.exports = function (sequelize, DataTypes) {
    var Gotchi = sequelize.define("Gotchi", {
        gotchiName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hungry: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        bored: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        lazy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        }
    });
    return Gotchi;
};
