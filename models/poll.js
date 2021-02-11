module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
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
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Poll.associate = (models) => {
    // Every poll will have multiple Ideas
    Poll.hasMany(models.Idea, {
      onDelete: 'cascade'
    });
  };

  return Poll;
};