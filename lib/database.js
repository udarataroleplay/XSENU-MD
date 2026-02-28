const mysql = require('mysql2/promise');

const DB_NAME = '';

async function initializeDatabase() {

    // First connect without DB
    const connection = await mysql.createConnection({
        host: '',
        user: '',
        password: ''
    });

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    await connection.end();

    // Create pool with DB
    const pool = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: '',
        waitForConnections: true,
        connectionLimit: 10
    });

    // Ensure columns exist
    await pool.query(`
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS whatsappid VARCHAR(20) NULL,
        ADD COLUMN IF NOT EXISTS verify VARCHAR(6) NULL
    `).catch(() => { });

    // Add unique constraint safely
    await pool.query(`
        ALTER TABLE users 
        ADD UNIQUE KEY unique_whatsappid (whatsappid)
    `).catch(() => { });

    console.log("✅ Database Ready");

    return pool;
}


module.exports = initializeDatabase();
