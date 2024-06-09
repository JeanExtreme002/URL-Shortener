import {DataTypes, Model, Sequelize} from 'sequelize';
import session from './session';

class URL extends Model {
    public id!: number;
    public url!: string;

    public readonly updatedAt!: Date;
}

URL.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
    },
    {
        tableName: 'URLS',
        timestamps: false,
        sequelize: session,
        paranoid: true,
    }
);

export default URL;
