import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function checkTables() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [tables] = await connection.query('SHOW TABLES');
    console.log('📊 Tables in database:');
    console.log(tables);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

checkTables();
