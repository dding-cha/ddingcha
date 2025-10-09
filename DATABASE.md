# 데이터베이스 설정 가이드

## 📋 개요

DdingCha는 MySQL 데이터베이스를 사용하여 사용자, 상품, 주문 등의 데이터를 관리합니다.

## 🗄️ 데이터베이스 스키마

### 테이블 구조

1. **users** - 사용자 (회원/비회원)
   - id (INT, AUTO_INCREMENT, PRIMARY KEY)
   - email (VARCHAR, UNIQUE)
   - name (VARCHAR)
   - phone (VARCHAR)
   - is_guest (BOOLEAN) - 비회원 여부
   - created_at, updated_at, last_login

2. **delivery_addresses** - 배송지
   - id (INT, AUTO_INCREMENT, PRIMARY KEY)
   - user_id (INT, FOREIGN KEY)
   - recipient_name, phone, postal_code, address, address_detail
   - is_default (BOOLEAN)

3. **products** - 상품
   - id (VARCHAR, PRIMARY KEY)
   - name, price, original_price, discount
   - rating, reviews, image, category_id
   - trending, badge, description, stock

4. **product_details** - 상품 상세 정보
   - product_id (FOREIGN KEY)
   - features (TEXT)
   - specifications (TEXT)

5. **carts** - 장바구니
   - user_id, product_id
   - quantity

6. **wishlists** - 좋아요
   - user_id, product_id

7. **orders** - 주문
   - order_number (UNIQUE)
   - user_id, status, total_amount, shipping_fee
   - 배송지 정보

8. **order_items** - 주문 상품
   - order_id, product_id, product_name, price, quantity

## 🚀 설정 방법

### 1. 환경 변수 설정

`.env` 파일에 데이터베이스 연결 정보가 있는지 확인:

```env
DB_HOST=136.117.74.19
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ssafy!234A
DB_NAME=ddingcha
```

### 2. 데이터베이스 스키마 생성

MySQL에 접속하여 스키마를 생성합니다:

**방법 1: MySQL CLI 사용**
```bash
mysql -h 136.117.74.19 -u root -p ddingcha < scripts/init-db.sql
```

**방법 2: MySQL Workbench 또는 다른 GUI 툴 사용**
- `scripts/init-db.sql` 파일을 열어서 실행

### 3. 초기 데이터 삽입 (Seeding)

**전체 데이터 한번에 삽입:**
```bash
npm run db:seed
```

**개별 데이터 삽입:**
```bash
# 상품 데이터만
npm run db:seed:products

# 사용자 데이터만
npm run db:seed:users
```

## 📦 초기 데이터

### 상품 (30개)
- 전자기기: 무선 이어버드, 스마트워치, 블루투스 스피커 등
- 패션/의류: 운동화, 백팩, 니트 스웨터 등
- 뷰티: 스킨케어 세트, 립스틱, 향수 등
- 홈/리빙: 블렌더, 공기청정기, 에어프라이어 등
- 스포츠/레저: 요가매트, 프로틴, 캠핑 랜턴 등
- 식품: 유기농 간식, 건강 간식 등
- 키즈/베이비: 유아 장난감, 아동용 태블릿 등
- 반려동물: 자동급식기, 목줄 세트 등

### 사용자 (2명)
- **회원**: demo@ddingcha.com (userId: 1)
  - 배송지 2개 등록
- **비회원**: 임시 게스트 사용자

## 🔧 데이터베이스 관리 명령어

```bash
# 스키마 생성
npm run db:init

# 전체 데이터 초기화
npm run db:seed

# 상품 데이터만 다시 삽입
npm run db:seed:products

# 사용자 데이터만 다시 삽입
npm run db:seed:users
```

## ⚠️ 주의사항

1. **데이터 손실**: `npm run db:seed`를 실행하면 기존 데이터가 모두 삭제됩니다.
2. **외부 키 제약**: 데이터 삭제 시 외부 키 관계를 고려해야 합니다.
3. **연결 오류**: 데이터베이스 연결 정보가 정확한지 확인하세요.

## 🧪 테스트 데이터

데모 사용자로 테스트:
- Email: `demo@ddingcha.com`
- User ID: `1`
- 저장된 배송지: 2개
- 로그인 없이 비회원 주문도 가능

## 🔍 문제 해결

### "ECONNREFUSED" 오류
```
데이터베이스 서버에 연결할 수 없습니다.
- DB_HOST, DB_PORT가 올바른지 확인
- 방화벽 설정 확인
- 데이터베이스 서버가 실행 중인지 확인
```

### "Access denied" 오류
```
데이터베이스 인증 실패
- DB_USER, DB_PASSWORD가 올바른지 확인
- 사용자 권한 확인
```

### "Table doesn't exist" 오류
```
테이블이 생성되지 않음
- npm run db:init을 먼저 실행
- scripts/init-db.sql이 정상적으로 실행되었는지 확인
```

## 📚 API 엔드포인트

모든 API는 MySQL 데이터베이스와 직접 연결되어 있습니다:

- `GET /api/products` - 상품 목록
- `GET /api/products/[id]` - 상품 상세
- `GET /api/carts?userId=1` - 장바구니
- `GET /api/wishlists?userId=1` - 좋아요
- `GET /api/orders?userId=1` - 주문 내역
- `POST /api/orders` - 주문 생성
- `GET /api/users?email=xxx` - 사용자 검색 (관리자)

더 자세한 내용은 `CLAUDE.md`를 참조하세요.
