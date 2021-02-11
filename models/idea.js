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
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Idea;
};