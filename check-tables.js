require('dotenv').config()
const mysql = require('mysql2/promise')

async function checkTables() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  const [productsDesc] = await connection.query('DESCRIBE products')
  console.log('=== products 테이블 ===')
  console.table(productsDesc)

  const [detailsDesc] = await connection.query('DESCRIBE product_details')
  console.log('\n=== product_details 테이블 ===')
  console.table(detailsDesc)

  await connection.end()
}

checkTables()
