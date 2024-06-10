import {Sequelize} from 'sequelize';

const session = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
});

export default session;
