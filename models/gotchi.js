module.exports = function (sequelize, DataTypes) {
    var Gotchi = sequelize.define("Gotchi", {
        gotchiName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gotchiPicture: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gotchiType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hungry: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        bored: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        lazy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        health: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        }
    });
    // We're saying that a Gotchi should belong to an User
    // A Gotchi can't be created without an User due to the foreign key constraint!
    Gotchi.associate = function(models) {
        Gotchi.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
 
    return Gotchi;
};
