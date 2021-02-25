// Model for the ideas (aka Suggestions) table. This store the suggestions that can be created and put up for a vote. Columns include the suggestion: Name, Description, Votes (stores the votecount), winner (stores the amount of times this suggestion has won), active (boolean which moves the item from suggestion to vote block)

module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    name: {
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
      type: DataTypes.INTEGER,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Idea.associate = (models) => {
    Idea.belongsTo(models.Category, {
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