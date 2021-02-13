const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    // username: {
    //   type: DataTypes.STRING(70),
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        isEmail: true
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
  });

  User.associate = function (models) {
    // Each User will participate on multiple polls
    User.hasMany(models.Suggestions, {
      onDelete: 'cascade'
    });

    User.hasMany(models.Poll, {
      onDelete: 'cascade'
    });

    User.hasMany(models.Votes, {
      onDelete: 'cascade'
    });

    User.belongsTo(models.Org, {
      foreignKey: {
        allowNull: false
      }
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