import dotenv from 'dotenv';
import { productRepository } from '../app/entities/product/model/repository';
import { query } from '../app/shared/lib/db/connection';

// Mock products for seeding
const MOCK_PRODUCTS = [
  { id: '1', name: '무선 이어버드 프로', price: 79000, originalPrice: 129000, discount: 39, rating: 4.8, reviews: 1234, image: '/products/earbuds.jpg', categoryId: 'electronics', trending: true, badge: '🔥 인기' },
  { id: '2', name: '스마트 워치 울트라', price: 199000, originalPrice: 299000, discount: 33, rating: 4.9, reviews: 2156, image: '/products/watch.jpg', categoryId: 'electronics', trending: true, badge: '⚡ 베스트' },
  { id: '3', name: '휴대용 블렌더', price: 39000, originalPrice: 59000, discount: 34, rating: 4.6, reviews: 892, image: '/products/blender.jpg', categoryId: 'home' },
  { id: '4', name: 'LED 스트립 조명', price: 24000, originalPrice: 39000, discount: 38, rating: 4.7, reviews: 1567, image: '/products/led.jpg', categoryId: 'home' },
  { id: '5', name: '요가 매트 세트', price: 49000, originalPrice: 79000, discount: 38, rating: 4.8, reviews: 743, image: '/products/yoga.jpg', categoryId: 'sports' },
  { id: '6', name: '휴대폰 거치대', price: 19000, originalPrice: 29000, discount: 34, rating: 4.5, reviews: 2341, image: '/products/holder.jpg', categoryId: 'electronics' },
  { id: '7', name: '미니 공기청정기', price: 89000, originalPrice: 139000, discount: 36, rating: 4.7, reviews: 1456, image: '/products/purifier.jpg', categoryId: 'home', trending: true, badge: '🔥 인기' },
  { id: '8', name: '스킨케어 세트', price: 59000, originalPrice: 89000, discount: 34, rating: 4.9, reviews: 3421, image: '/products/skincare.jpg', categoryId: 'beauty', trending: true },
  { id: '9', name: '프리미엄 텀블러', price: 35000, originalPrice: 55000, discount: 36, rating: 4.6, reviews: 892, image: '/products/tumbler.jpg', categoryId: 'home' },
  { id: '10', name: '블루투스 스피커', price: 69000, originalPrice: 109000, discount: 37, rating: 4.8, reviews: 2134, image: '/products/speaker.jpg', categoryId: 'electronics' },
  { id: '11', name: '운동화 에어맥스', price: 129000, originalPrice: 189000, discount: 32, rating: 4.7, reviews: 1678, image: '/products/sneakers.jpg', categoryId: 'fashion' },
  { id: '12', name: '캠핑 랜턴', price: 45000, originalPrice: 69000, discount: 35, rating: 4.6, reviews: 987, image: '/products/lantern.jpg', categoryId: 'sports' },
  { id: '13', name: '무선 충전 패드', price: 29000, originalPrice: 49000, discount: 41, rating: 4.5, reviews: 1543, image: '/products/charger.jpg', categoryId: 'electronics' },
  { id: '14', name: '프리미엄 립스틱 세트', price: 49000, originalPrice: 79000, discount: 38, rating: 4.8, reviews: 2876, image: '/products/lipstick.jpg', categoryId: 'beauty' },
  { id: '15', name: '키친 나이프 세트', price: 79000, originalPrice: 129000, discount: 39, rating: 4.7, reviews: 654, image: '/products/knife.jpg', categoryId: 'home' },
  { id: '16', name: '백팩 프로', price: 89000, originalPrice: 139000, discount: 36, rating: 4.9, reviews: 3214, image: '/products/backpack.jpg', categoryId: 'fashion', trending: true },
  { id: '17', name: '유기농 간식 세트', price: 35000, originalPrice: 55000, discount: 36, rating: 4.6, reviews: 1234, image: '/products/snacks.jpg', categoryId: 'food' },
  { id: '18', name: '반려동물 자동급식기', price: 119000, originalPrice: 179000, discount: 34, rating: 4.8, reviews: 876, image: '/products/feeder.jpg', categoryId: 'pet' },
  { id: '19', name: '아동용 태블릿', price: 149000, originalPrice: 229000, discount: 35, rating: 4.7, reviews: 1567, image: '/products/tablet.jpg', categoryId: 'kids' },
  { id: '20', name: '휴대용 선풍기', price: 19000, originalPrice: 29000, discount: 34, rating: 4.5, reviews: 2341, image: '/products/fan.jpg', categoryId: 'home' },
  { id: '21', name: '게이밍 마우스', price: 69000, originalPrice: 99000, discount: 30, rating: 4.8, reviews: 1987, image: '/products/mouse.jpg', categoryId: 'electronics' },
  { id: '22', name: '향수 세트', price: 89000, originalPrice: 139000, discount: 36, rating: 4.9, reviews: 2543, image: '/products/perfume.jpg', categoryId: 'beauty' },
  { id: '23', name: '에어프라이어', price: 129000, originalPrice: 199000, discount: 35, rating: 4.7, reviews: 3456, image: '/products/airfryer.jpg', categoryId: 'home', trending: true },
  { id: '24', name: '니트 스웨터', price: 59000, originalPrice: 89000, discount: 34, rating: 4.6, reviews: 1234, image: '/products/sweater.jpg', categoryId: 'fashion' },
  { id: '25', name: '프로틴 보충제', price: 49000, originalPrice: 69000, discount: 29, rating: 4.8, reviews: 2109, image: '/products/protein.jpg', categoryId: 'sports' },
  { id: '26', name: '커피 머신', price: 199000, originalPrice: 299000, discount: 33, rating: 4.9, reviews: 1876, image: '/products/coffee.jpg', categoryId: 'home' },
  { id: '27', name: '선글라스 UV400', price: 39000, originalPrice: 69000, discount: 43, rating: 4.7, reviews: 1543, image: '/products/sunglasses.jpg', categoryId: 'fashion' },
  { id: '28', name: '유아 장난감 세트', price: 79000, originalPrice: 119000, discount: 34, rating: 4.8, reviews: 987, image: '/products/toys.jpg', categoryId: 'kids' },
  { id: '29', name: '반려견 목줄 세트', price: 29000, originalPrice: 45000, discount: 36, rating: 4.6, reviews: 654, image: '/products/leash.jpg', categoryId: 'pet' },
  { id: '30', name: '건강 간식 믹스', price: 25000, originalPrice: 39000, discount: 36, rating: 4.7, reviews: 1432, image: '/products/healthsnack.jpg', categoryId: 'food' },
] as any[];

dotenv.config();

async function seedProducts() {
  console.log('🌱 Starting product seeding...');

  try {
    // Clear existing products first
    console.log('🗑️  Clearing existing products...');
    await query('DELETE FROM product_features');
    await query('DELETE FROM products');
    console.log('✅ Existing data cleared');

    // Insert products
    for (let i = 0; i < MOCK_PRODUCTS.length; i++) {
      const mockProduct = MOCK_PRODUCTS[i];

      console.log(`📦 Seeding product ${i + 1}/${MOCK_PRODUCTS.length}: ${mockProduct.name}`);

      await productRepository.create({
        ...mockProduct,
        description: `${mockProduct.name}는 최고의 품질과 성능을 자랑하는 제품입니다. 트렌디한 디자인과 실용성을 모두 갖춘 이 제품으로 일상의 변화를 경험해보세요.`,
        features: [
          '프리미엄 소재 사용',
          '간편한 사용법',
          '우수한 내구성',
          '세련된 디자인',
        ],
        stock: Math.floor(Math.random() * 100) + 50, // 50-150 random stock
        shippingInfo: {
          freeShipping: mockProduct.price >= 30000,
          estimatedDays: '1-2일',
        },
        specifications: {
          브랜드: '띵차 셀렉션',
          원산지: '한국',
          보증기간: '1년',
        },
      });
    }

    // Verify
    const result = await query<any[]>('SELECT COUNT(*) as count FROM products');
    console.log(`📊 총 ${result[0].count}개 상품이 데이터베이스에 저장되었습니다.`);
    console.log('✅ Product seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
}

seedProducts()
  .then(() => {
    console.log('🎉 Seeding process completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding process failed:', error);
    process.exit(1);
  });
