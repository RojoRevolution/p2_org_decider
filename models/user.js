module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username : {
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
      type: DataTypes.STRING(15),
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
  
  return User;
};