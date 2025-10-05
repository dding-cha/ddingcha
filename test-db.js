require('dotenv').config()
const mysql = require('mysql2/promise')

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    console.log('✅ DB 연결 성공!')

    const [rows] = await connection.query('SELECT 1 + 1 AS result')
    console.log('쿼리 테스트:', rows)

    const [tables] = await connection.query('SHOW TABLES')
    console.log('테이블 목록:', tables)

    await connection.end()
  } catch (error) {
    console.error('❌ DB 연결 실패:', error.message)
  }
}

testConnection()
