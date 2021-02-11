
module.exports = (sequelize, DataTypes) => {
  const Org = sequelize.define('Org', {
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    admin: {
      type: DataTypes.INTEGER,
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