import {DataTypes, Model, ModelAttributes, Sequelize} from 'sequelize';

class URLModel extends Model {
    declare id: number;
    declare url: string;

    declare visitedAt: Date;
}

const UrlModelAttributes: ModelAttributes = {
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
};

export {URLModel, UrlModelAttributes};
