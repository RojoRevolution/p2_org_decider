module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category: {
            type: DataTypes.STRING(70),
            allowNull: false,
            validate: {
                len: [1]
            }
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

    Category.associate = (models) => {
        Category.belongsTo(models.User, {
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