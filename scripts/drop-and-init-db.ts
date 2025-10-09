import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import mysql from 'mysql2/promise';

dotenv.config();

async function dropAndInitDb() {
  console.log('🔧 Dropping and initializing database schema...');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('🗑️  Dropping existing tables...');

    // Disable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    // Get all existing tables
    const [tables] = await connection.query<any[]>('SHOW TABLES');
    console.log(`Found ${tables.length} existing tables`);

    // Drop all tables
    for (const table of tables) {
      const tableName = Object.values(table)[0] as string;
      await connection.query(`DROP TABLE IF EXISTS \`${tableName}\``);
      console.log(`Dropped table: ${tableName}`);
    }

    // Enable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('✅ Existing tables dropped');

    // Read SQL file
    const sqlPath = path.join(__dirname, 'init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    console.log('📄 Reading init-db.sql...');

    // Remove comments and split by semicolon
    const cleanSql = sql
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n');

    const statements = cleanSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`Executing ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        try {
          await connection.query(statement);
          console.log(`  ✓ Statement ${i + 1}/${statements.length}`);
        } catch (error: any) {
          console.error(`  ✗ Failed at statement ${i + 1}:`, error.message);
          console.error('Statement:', statement.substring(0, 100));
          throw error;
        }
      }
    }

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

dropAndInitDb()
  .then(() => {
    console.log('🎉 Database initialization completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Database initialization failed:', error);
    process.exit(1);
  });
