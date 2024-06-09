import {DataTypes, Model, Sequelize} from 'sequelize';
import {session} from './session';

class URLModel extends Model {
    declare id: number;
    declare url: string;

    declare updatedAt: Date;
}

URLModel.init(
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

export default URLModel;
