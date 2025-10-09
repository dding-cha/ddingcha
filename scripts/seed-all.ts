import dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config();

async function seedAll() {
  console.log('🚀 Starting complete database seeding...\n');

  try {
    // 1. Seed products
    console.log('📦 Step 1: Seeding products...');
    execSync('npx tsx scripts/seed-products.ts', { stdio: 'inherit' });
    console.log('✅ Products seeded\n');

    // 2. Seed users
    console.log('👤 Step 2: Seeding users...');
    execSync('npx tsx scripts/seed-users.ts', { stdio: 'inherit' });
    console.log('✅ Users seeded\n');

    console.log('🎉 All seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('  - Products: 30 items');
    console.log('  - Users: 2 (1 member + 1 guest)');
    console.log('  - Addresses: 2');
    console.log('\n🔑 Demo Login:');
    console.log('  - Email: demo@ddingcha.com');
    console.log('  - User ID: 1');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedAll()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Error:', error);
    process.exit(1);
  });
