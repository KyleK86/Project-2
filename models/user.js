
var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4, 15]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [4, 100]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 60]
            }
        }
    });

    User.associate = function(models) {
        User.hasOne(models.Gotchi);
    };

    // Method to compare an unhashed password to the hashed password stored in database
    User.prototype.verifyPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    // Automatically hash user password
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};
