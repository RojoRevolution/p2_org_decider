// Model for the Category Table which will store the main navigation in the sidebar once logged in.

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category: {
            type: DataTypes.STRING(70),
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    Category.associate = (models) => {
        Category.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Category.belongsTo(models.Org, {
            foreignKey: {
                allowNull: false
            }
        });

        Category.hasMany(models.Idea, {
            foreignKey: {
                allowNull: false,
                onDelete: 'cascade'
            }
        });
    };

    return Category;
};