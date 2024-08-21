const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

// Configuration for your Azure SQL Database
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: false // Set to true if using self-signed certificates
    }
};

// Create a connection pool and export it
let pool;

async function getConnection() {
    if (!pool) {
        pool = await sql.connect(config);
    }
    return pool;
}

module.exports = getConnection;
