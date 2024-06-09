import * as dotenv from 'dotenv';
dotenv.config();

// Interfaces for loading env variables.
interface DatabaseConfig {
    driver: string;
    name: string;
    host: string;
    port: number;
    user: string;
    password: string;
}

interface ServerConfig {
    port: number;
}

interface Config {
    database: DatabaseConfig;
    server: ServerConfig;
}

// Load env variables.
const database = {
    driver: process.env.DATABASE_DRIVER || '',
    name: process.env.DATABASE_NAME || '',
    host: process.env.DATABASE_HOST || '',
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USER || '',
    password: process.env.DATABASE_PASSWORD || '',
} as DatabaseConfig;

const server = {
    port: process.env.SERVER_PORT || 5000,
} as ServerConfig;

const config: Config = {
    database: database,
    server: server,
};

export default config;
