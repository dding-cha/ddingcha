import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import mysql from 'mysql2/promise';

dotenv.config();

async function runInitDb() {
  console.log('🔧 Initializing database schema...');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  try {
    // Read SQL file
    const sqlPath = path.join(__dirname, 'init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    console.log('📄 Reading init-db.sql...');

    // Execute SQL
    await connection.query(sql);

    console.log('✅ Database schema initialized successfully!');
    console.log('📊 Tables created:');
    console.log('   - users');
    console.log('   - delivery_addresses');
    console.log('   - products');
    console.log('   - product_features');
    console.log('   - carts');
    console.log('   - wishlists');
    console.log('   - orders');
    console.log('   - order_items');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

runInitDb()
  .then(() => {
    console.log('🎉 Database initialization completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Database initialization failed:', error);
    process.exit(1);
  });
