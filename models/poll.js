module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    id : {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name : {
      type: DataTypes.STRING(60),
      allowNull = false,
      validate: {
        len: [1]
      }
    },
    creator: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: true,
      allowNull: false
    }
  });
  return Poll;
};