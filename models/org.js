const author = require("../examples/13-Post-Author-Association/Solved/models/author");

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
      type: DataTypes.STRING(70),
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

  Org.associate = (models) => {
    //Each Org will have several users
    Org.hasMany(models.User, {
      onDelete: 'cascade'
    });
  };
  
  return Org;
};