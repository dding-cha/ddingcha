import mysql from 'mysql2/promise'
import { MOCK_PRODUCTS } from '../app/entities/product/model/mock-products'
import 'dotenv/config'

async function seedProducts() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  try {
    console.log('🔗 Connected to database')

    // Create tables
    console.log('📋 Creating tables...')
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        original_price INT NOT NULL,
        discount INT NOT NULL,
        rating DECIMAL(2,1) NOT NULL DEFAULT 0.0,
        reviews INT NOT NULL DEFAULT 0,
        image VARCHAR(255) NOT NULL,
        category_id VARCHAR(50) NOT NULL,
        trending BOOLEAN DEFAULT FALSE,
        badge VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category_id),
        INDEX idx_trending (trending),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `
    await connection.query(createTablesSQL)

    const createDetailsTableSQL = `
      CREATE TABLE IF NOT EXISTS product_details (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id VARCHAR(50) NOT NULL,
        description TEXT,
        features TEXT,
        specifications TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_product (product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `
    await connection.query(createDetailsTableSQL)

    console.log('✅ Tables created')

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await connection.query('DELETE FROM product_details')
    await connection.query('DELETE FROM products')
    console.log('✅ Data cleared')

    // Insert products
    console.log('📦 Inserting products...')
    for (const product of MOCK_PRODUCTS) {
      await connection.query(
        `INSERT INTO products (id, name, price, original_price, discount, rating, reviews, image, category_id, trending, badge)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.id,
          product.name,
          product.price,
          product.originalPrice,
          product.discount,
          product.rating,
          product.reviews,
          product.image,
          product.categoryId,
          product.trending || false,
          product.badge || null,
        ]
      )

      // Insert product details
      await connection.query(
        `INSERT INTO product_details (product_id, description, features, specifications)
         VALUES (?, ?, ?, ?)`,
        [
          product.id,
          `${product.name}은(는) 틱톡에서 화제가 된 트렌딩 상품입니다. 높은 품질과 합리적인 가격으로 많은 고객들의 사랑을 받고 있습니다.`,
          JSON.stringify(['고품질 소재 사용', '세련된 디자인', '다양한 활용도', '내구성 우수', '사용자 친화적']),
          JSON.stringify({ 브랜드: '띵차', 원산지: '한국', 배송: '1-3일' }),
        ]
      )
    }

    console.log(`✅ ${MOCK_PRODUCTS.length}개 상품 추가 완료`)

    // Verify
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products')
    console.log(`📊 총 ${(rows as any)[0].count}개 상품이 데이터베이스에 저장되었습니다.`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await connection.end()
    console.log('🔌 Database connection closed')
  }
}

seedProducts()
  .then(() => {
    console.log('✨ Seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error)
    process.exit(1)
  })
