module.exports = (sequelize, DataTypes) => {
    const Suggestions = sequelize.define('Suggestions', {
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
    });

    Suggestions.associate = (models) => {

        Suggestions.hasMany(models.Votes, {
            onDelete: 'cascade'
        });

        Suggestions.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Suggestions;
};