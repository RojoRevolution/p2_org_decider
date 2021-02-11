module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id : {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username : {
      type: DataTypes.STRING(60),
      allowNull = false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull = false,
      validate: {
        len: [1]
      }
    }
  });
  return User;
};