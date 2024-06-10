import {DataTypes, Model, Sequelize} from 'sequelize';
import {session} from './session';

class URLModel extends Model {
    declare id: number;
    declare url: string;

    declare visitedAt: Date;
}

URLModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
            validate: {len: [3, 200]},
        },
        visitedAt: {
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
