module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    name : {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description : {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Idea.associate = (models) => {
    Idea.belongsTo(models.Poll, {
      foreignKey: {
        allowNull: false
      }
    });

    Idea.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Idea;
};