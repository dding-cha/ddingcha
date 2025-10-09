import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('🔌 Connected to database');

  try {
    // 1. Products table
    console.log('📦 Creating products table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2) NOT NULL,
        discount INT DEFAULT 0,
        stock INT NOT NULL DEFAULT 0,
        rating DECIMAL(2,1) DEFAULT 0,
        reviews_count INT DEFAULT 0,
        image_url VARCHAR(500) NOT NULL,
        trending BOOLEAN DEFAULT FALSE,
        badge VARCHAR(50),
        free_shipping BOOLEAN DEFAULT FALSE,
        shipping_days VARCHAR(20) DEFAULT '1-2일',
        brand VARCHAR(100),
        origin VARCHAR(100),
        warranty_period VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category_id),
        INDEX idx_trending (trending),
        INDEX idx_price (price),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 2. Product features table
    console.log('✨ Creating product_features table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS product_features (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        product_id VARCHAR(36) NOT NULL,
        feature VARCHAR(255) NOT NULL,
        display_order INT DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_product_id (product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 3. Product images table
    console.log('🖼️  Creating product_images table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS product_images (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        product_id VARCHAR(36) NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        display_order INT DEFAULT 0,
        is_primary BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_product_id (product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 4. Users table
    console.log('👤 Creating users table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        UNIQUE INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 5. Delivery addresses table
    console.log('🏠 Creating delivery_addresses table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS delivery_addresses (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(36) NOT NULL,
        recipient_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        postal_code VARCHAR(10) NOT NULL,
        address VARCHAR(255) NOT NULL,
        address_detail VARCHAR(255),
        is_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_is_default (is_default)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 6. Orders table
    console.log('🛒 Creating orders table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        delivery_address_id BIGINT NOT NULL,
        order_number VARCHAR(50) NOT NULL UNIQUE,
        total_amount DECIMAL(10,2) NOT NULL,
        shipping_fee DECIMAL(10,2) DEFAULT 0,
        status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        payment_status ENUM('pending', 'completed', 'failed') NOT NULL,
        ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (delivery_address_id) REFERENCES delivery_addresses(id),
        INDEX idx_user_id (user_id),
        INDEX idx_status (status),
        UNIQUE INDEX idx_order_number (order_number),
        INDEX idx_ordered_at (ordered_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 7. Order items table
    console.log('📋 Creating order_items table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        order_id VARCHAR(36) NOT NULL,
        product_id VARCHAR(36) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        quantity INT NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id),
        INDEX idx_order_id (order_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 8. Cart items table
    console.log('🛍️  Creating cart_items table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(36) NOT NULL,
        product_id VARCHAR(36) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        UNIQUE INDEX idx_user_product (user_id, product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 9. Wishlist items table
    console.log('❤️  Creating wishlist_items table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS wishlist_items (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(36) NOT NULL,
        product_id VARCHAR(36) NOT NULL,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        UNIQUE INDEX idx_user_product (user_id, product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 10. Reviews table
    console.log('⭐ Creating reviews table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        product_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        order_id VARCHAR(36),
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
        INDEX idx_product_id (product_id),
        INDEX idx_user_id (user_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Database schema created successfully!');
  } catch (error) {
    console.error('❌ Error creating database schema:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

initDatabase()
  .then(() => {
    console.log('🎉 Database initialization completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Database initialization failed:', error);
    process.exit(1);
  });
