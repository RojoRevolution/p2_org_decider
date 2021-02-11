module.exports = (sequelize, DataTypes) => {
  const Org = sequelize.define('Org', {
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
    admin: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: true,
      allowNull: false
    }
  });
  return Org;
};