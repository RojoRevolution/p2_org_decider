module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
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