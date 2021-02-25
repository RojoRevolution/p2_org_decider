// This model stores the organization created, which is used to group users within the dashboard so all user will see the same categories, suggestions and vote blocks within the dashboard.

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
      allowNull: true
    }
  });

  Org.associate = (models) => {
    //Each Org will have several users
    Org.hasMany(models.User, {
      onDelete: 'cascade'
    });

    Org.hasMany(models.Category, {
      onDelete: 'cascade'
    });
  };

  return Org;
};