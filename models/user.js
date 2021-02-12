const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  User.associate = (models) => {
    // Each User will participate on multiple polls
    User.hasMany(models.Poll, {
      onDelete: 'cascade'
    });
  };


  // Checks to make sure unhashed password matches the hashed password in database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // This hook automatically hashes the password before the User is created
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};