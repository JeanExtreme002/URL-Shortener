import {Dialect, Sequelize} from 'sequelize';
import config from '../config';

import './url';

const session: Sequelize = new Sequelize({
    dialect: config.database.driver as Dialect,
    database: config.database.name,
    host: config.database.host,
    port: config.database.port,
    username: config.database.user,
    password: config.database.password,
    logging: config.devMode,
});

/**
 * Authenticate and sync the models.
 */
async function initialize(callback: (value: void) => void, sync = false) {
    await session.authenticate();

    console.info('Connection to the database established successfully.');

    if (sync) {
        await session.sync({alter: true});
        console.info('Synchronized database');
    }

    callback();
}

export {initialize, session};
