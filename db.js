
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'evenue',
    port: 3306
});

async function testConnection() {
    try {
        const connection = await db.getConnection();

        console.log('Database MySQL berhasil terhubung!');

        connection.release();
    } catch (error) {
        console.error('Koneksi database gagal:', error.message);
    }
}

testConnection();

module.exports = db;
