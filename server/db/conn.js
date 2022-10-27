const { Client } = require('pg');
const credentials = {
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "postgres",
    database: "postgres"
}
const client = new Client(credentials);

module.exports = client;