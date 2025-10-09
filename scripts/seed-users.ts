import dotenv from 'dotenv';
import { query } from '../app/shared/lib/db/connection';

dotenv.config();

async function seedUsers() {
  console.log('🌱 Starting user seeding...');

  try {
    // Create a demo user
    console.log('👤 Creating demo user...');

    const result: any = await query(
      'INSERT INTO users (email, name, phone, is_guest) VALUES (?, ?, ?, ?)',
      ['demo@ddingcha.com', '데모 사용자', '010-1234-5678', false]
    );

    const userId = result.insertId;
    console.log(`✅ Demo user created with ID: ${userId}`);

    // Create demo addresses
    console.log('📍 Creating demo addresses...');

    await query(
      `INSERT INTO delivery_addresses
       (user_id, recipient_name, phone, postal_code, address, address_detail, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, '데모 사용자', '010-1234-5678', '06234', '서울특별시 강남구 테헤란로 123', '101동 1001호', true]
    );

    await query(
      `INSERT INTO delivery_addresses
       (user_id, recipient_name, phone, postal_code, address, address_detail, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, '김철수', '010-9876-5432', '06235', '서울특별시 강남구 역삼로 456', '202동 2002호', false]
    );

    console.log('✅ Demo addresses created');

    // Create a guest user
    console.log('👤 Creating guest user...');

    await query(
      'INSERT INTO users (email, name, phone, is_guest) VALUES (?, ?, ?, ?)',
      [null, '비회원', '010-0000-0000', true]
    );

    console.log('✅ Guest user created');

    console.log('🎉 User seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}

seedUsers()
  .then(() => {
    console.log('🎉 Seeding process completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding process failed:', error);
    process.exit(1);
  });
