module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define('Bill', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
        },
        id_client: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
        },
        total_price: {
            type: DataTypes.BIGINT(),
            allowNull: false,
        },
    },
        {
            updatedAt: false,
            freezeTableName: true,
            tableName: 'bill',
        }
    );

    Bill.associate = (models) => {
        Bill.belongsTo(models.User, {
            foreignKey: 'id_client',
            as: 'clients',
        });

        Bill.hasMany(models.Bill_Details, {
            foreignKey: 'id_bill',
            as: 'details_bills',
        });
    };

    return Bill;
}