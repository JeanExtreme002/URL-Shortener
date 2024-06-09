import {Dialect, Sequelize} from 'sequelize';
import URL from './url';
import config from '../config';

const session: Sequelize = new Sequelize({
    dialect: config.database.driver as Dialect,
    database: config.database.name,
    host: config.database.host,
    port: config.database.port,
    username: config.database.user,
    password: config.database.password,
});

// Test connection.
session
    .authenticate()
    .then(() => {
        console.log('Connection established successfully.');
    })
    .catch(error => {
        console.error('Could not connect to the database', error);
    });

// Sync table.
URL.sync({alter: true});

export default session;
