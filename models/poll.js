module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
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
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    winner: {
      type: DataTypes.INTEGER
    }
  });

  Poll.associate = (models) => {
    // Every poll will have multiple Ideas
    Poll.hasMany(models.Idea, {
      onDelete: 'cascade'
    });

    Poll.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Poll;
};