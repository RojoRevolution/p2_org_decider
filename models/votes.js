module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    title: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    winner: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  });

  Votes.associate = (models) => {
    Votes.belongsTo(models.Suggestions, {
      foreignKey: {
        allowNull: false
      }
    });

    Votes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Votes;
};