const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sims'
});

try {
    pool.getConnection()
    console.log('[V] Connection to the database was successful');
} catch (error) {
    console.error('[X] Connection Irapfuye my guy ikibazo niki: ', error.message);
}

module.exports = pool;