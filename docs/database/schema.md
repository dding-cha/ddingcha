# 띵차 데이터베이스 스키마 설계

## 개요
띵차 전자상거래 플랫폼의 데이터베이스 스키마 설계 문서입니다.

---

## 1. 상품 테이블 (products)

상품 정보를 저장하는 메인 테이블입니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | VARCHAR(36) | PRIMARY KEY | 상품 고유 ID (UUID) |
| name | VARCHAR(255) | NOT NULL | 상품명 |
| description | TEXT | NULL | 상품 상세 설명 |
| category_id | VARCHAR(50) | NOT NULL, INDEX | 카테고리 ID (electronics, fashion, etc.) |
| price | DECIMAL(10,2) | NOT NULL | 판매 가격 |
| original_price | DECIMAL(10,2) | NOT NULL | 원가 |
| discount | INT | DEFAULT 0 | 할인율 (%) |
| stock | INT | NOT NULL, DEFAULT 0 | 재고 수량 |
| rating | DECIMAL(2,1) | DEFAULT 0 | 평균 평점 (0.0~5.0) |
| reviews_count | INT | DEFAULT 0 | 리뷰 개수 |
| image_url | VARCHAR(500) | NOT NULL | 대표 이미지 URL |
| trending | BOOLEAN | DEFAULT FALSE | 트렌딩 상품 여부 |
| badge | VARCHAR(50) | NULL | 배지 텍스트 (🔥 인기, ⚡ 베스트 등) |
| free_shipping | BOOLEAN | DEFAULT FALSE | 무료배송 여부 |
| shipping_days | VARCHAR(20) | DEFAULT '1-2일' | 배송 소요일 |
| brand | VARCHAR(100) | NULL | 브랜드명 |
| origin | VARCHAR(100) | NULL | 원산지 |
| warranty_period | VARCHAR(50) | NULL | 보증기간 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 생성일시 |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | 수정일시 |

### 인덱스
```sql
CREATE INDEX idx_category ON products(category_id);
CREATE INDEX idx_trending ON products(trending);
CREATE INDEX idx_price ON products(price);
CREATE INDEX idx_created_at ON products(created_at);
```

### SQL 예시
```sql
CREATE TABLE products (
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
);
```

---

## 2. 상품 특징 테이블 (product_features)

상품의 주요 특징을 별도 테이블로 관리합니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 특징 고유 ID |
| product_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 상품 ID |
| feature | VARCHAR(255) | NOT NULL | 특징 내용 |
| display_order | INT | DEFAULT 0 | 표시 순서 |

### SQL 예시
```sql
CREATE TABLE product_features (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id VARCHAR(36) NOT NULL,
  feature VARCHAR(255) NOT NULL,
  display_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product_id (product_id)
);
```

---

## 3. 상품 이미지 테이블 (product_images)

상품의 추가 이미지를 관리합니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 이미지 고유 ID |
| product_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 상품 ID |
| image_url | VARCHAR(500) | NOT NULL | 이미지 URL |
| display_order | INT | DEFAULT 0 | 표시 순서 |
| is_primary | BOOLEAN | DEFAULT FALSE | 대표 이미지 여부 |

### SQL 예시
```sql
CREATE TABLE product_images (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id VARCHAR(36) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product_id (product_id)
);
```

---

## 4. 사용자 테이블 (users)

회원 정보를 관리합니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | VARCHAR(36) | PRIMARY KEY | 사용자 고유 ID (UUID) |
| email | VARCHAR(255) | NOT NULL, UNIQUE | 이메일 (로그인 ID) |
| password_hash | VARCHAR(255) | NOT NULL | 비밀번호 해시 |
| name | VARCHAR(100) | NOT NULL | 이름 |
| phone | VARCHAR(20) | NULL | 전화번호 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 가입일시 |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | 수정일시 |
| last_login | TIMESTAMP | NULL | 마지막 로그인 |

### 인덱스
```sql
CREATE UNIQUE INDEX idx_email ON users(email);
```

### SQL 예시
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  UNIQUE INDEX idx_email (email)
);
```

---

## 5. 배송지 테이블 (delivery_addresses)

사용자의 배송지 정보를 관리합니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 배송지 고유 ID |
| user_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 사용자 ID |
| recipient_name | VARCHAR(100) | NOT NULL | 수령인 이름 |
| phone | VARCHAR(20) | NOT NULL | 전화번호 |
| postal_code | VARCHAR(10) | NOT NULL | 우편번호 |
| address | VARCHAR(255) | NOT NULL | 기본 주소 |
| address_detail | VARCHAR(255) | NULL | 상세 주소 |
| is_default | BOOLEAN | DEFAULT FALSE | 기본 배송지 여부 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 생성일시 |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | 수정일시 |

### 인덱스
```sql
CREATE INDEX idx_user_id ON delivery_addresses(user_id);
CREATE INDEX idx_is_default ON delivery_addresses(is_default);
```

### SQL 예시
```sql
CREATE TABLE delivery_addresses (
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
);
```

### 비즈니스 로직
- 사용자당 하나의 기본 배송지만 설정 가능
- 새로운 배송지를 기본으로 설정 시, 기존 기본 배송지는 자동으로 해제
- 사용자 삭제 시 모든 배송지도 함께 삭제 (CASCADE)

---

## 6. 주문 테이블 (orders)

주문 정보를 관리합니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | VARCHAR(36) | PRIMARY KEY | 주문 고유 ID (UUID) |
| user_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 사용자 ID |
| delivery_address_id | BIGINT | NOT NULL, FOREIGN KEY | 배송지 ID |
| order_number | VARCHAR(50) | NOT NULL, UNIQUE | 주문번호 |
| total_amount | DECIMAL(10,2) | NOT NULL | 총 주문 금액 |
| shipping_fee | DECIMAL(10,2) | DEFAULT 0 | 배송비 |
| status | ENUM | NOT NULL | 주문 상태 (pending, confirmed, shipped, delivered, cancelled) |
| payment_method | VARCHAR(50) | NOT NULL | 결제 수단 |
| payment_status | ENUM | NOT NULL | 결제 상태 (pending, completed, failed) |
| ordered_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 주문일시 |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | 수정일시 |

### 인덱스
```sql
CREATE INDEX idx_user_id ON orders(user_id);
CREATE INDEX idx_status ON orders(status);
CREATE UNIQUE INDEX idx_order_number ON orders(order_number);
CREATE INDEX idx_ordered_at ON orders(ordered_at);
```

### SQL 예시
```sql
CREATE TABLE orders (
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
);
```

---

## 7. 주문 상품 테이블 (order_items)

주문에 포함된 상품 정보를 관리합니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 주문 상품 고유 ID |
| order_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 주문 ID |
| product_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 상품 ID |
| product_name | VARCHAR(255) | NOT NULL | 상품명 (스냅샷) |
| price | DECIMAL(10,2) | NOT NULL | 주문 당시 가격 |
| quantity | INT | NOT NULL | 수량 |
| subtotal | DECIMAL(10,2) | NOT NULL | 소계 (price * quantity) |

### SQL 예시
```sql
CREATE TABLE order_items (
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
);
```

---

## 8. 장바구니 테이블 (cart_items)

사용자의 장바구니를 관리합니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 장바구니 항목 고유 ID |
| user_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 사용자 ID |
| product_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 상품 ID |
| quantity | INT | NOT NULL, DEFAULT 1 | 수량 |
| added_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 추가일시 |

### 인덱스
```sql
CREATE INDEX idx_user_id ON cart_items(user_id);
CREATE UNIQUE INDEX idx_user_product ON cart_items(user_id, product_id);
```

### SQL 예시
```sql
CREATE TABLE cart_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(36) NOT NULL,
  product_id VARCHAR(36) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  UNIQUE INDEX idx_user_product (user_id, product_id)
);
```

---

## 9. 위시리스트 테이블 (wishlist_items)

사용자의 위시리스트를 관리합니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 위시리스트 항목 고유 ID |
| user_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 사용자 ID |
| product_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 상품 ID |
| added_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 추가일시 |

### 인덱스
```sql
CREATE INDEX idx_user_id ON wishlist_items(user_id);
CREATE UNIQUE INDEX idx_user_product ON wishlist_items(user_id, product_id);
```

### SQL 예시
```sql
CREATE TABLE wishlist_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(36) NOT NULL,
  product_id VARCHAR(36) NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  UNIQUE INDEX idx_user_product (user_id, product_id)
);
```

---

## 10. 리뷰 테이블 (reviews)

상품 리뷰를 관리합니다.

### 컬럼 정의

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 리뷰 고유 ID |
| product_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 상품 ID |
| user_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 사용자 ID |
| order_id | VARCHAR(36) | NULL, FOREIGN KEY | 주문 ID (구매 인증) |
| rating | INT | NOT NULL | 평점 (1~5) |
| title | VARCHAR(255) | NULL | 리뷰 제목 |
| content | TEXT | NOT NULL | 리뷰 내용 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 작성일시 |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | 수정일시 |

### 인덱스
```sql
CREATE INDEX idx_product_id ON reviews(product_id);
CREATE INDEX idx_user_id ON reviews(user_id);
CREATE INDEX idx_created_at ON reviews(created_at);
```

### SQL 예시
```sql
CREATE TABLE reviews (
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
);
```

---

## ERD (Entity Relationship Diagram)

```
users (1) ──< (N) delivery_addresses
users (1) ──< (N) orders
users (1) ──< (N) cart_items
users (1) ──< (N) wishlist_items
users (1) ──< (N) reviews

products (1) ──< (N) product_features
products (1) ──< (N) product_images
products (1) ──< (N) order_items
products (1) ──< (N) cart_items
products (1) ──< (N) wishlist_items
products (1) ──< (N) reviews

orders (1) ──< (N) order_items
orders (N) ──> (1) delivery_addresses
orders (1) ──< (N) reviews
```

---

## 카테고리 정의

현재 카테고리는 enum이 아닌 문자열로 관리됩니다. (향후 별도 테이블로 확장 가능)

- `electronics` - 전자기기
- `fashion` - 패션/의류
- `beauty` - 뷰티
- `home` - 홈/리빙
- `sports` - 스포츠/레저
- `food` - 식품
- `kids` - 키즈/베이비
- `pet` - 반려동물

---

## 다음 단계

1. **데이터베이스 선택**: MySQL, PostgreSQL, MongoDB 등
2. **ORM 도입**: Prisma, TypeORM, Sequelize 등
3. **마이그레이션 도구**: Flyway, Liquibase 등
4. **API 개발**: Next.js API Routes 또는 별도 백엔드 서버
5. **인증/인가**: NextAuth.js, JWT 등

---

## 참고 사항

- 모든 금액은 원화(KRW) 기준
- 날짜/시간은 UTC 또는 KST로 통일
- UUID는 36자 문자열 형태로 저장 (VARCHAR(36))
- 삭제는 Soft Delete 또는 Hard Delete 정책 결정 필요
- 보안: 비밀번호는 bcrypt 등으로 해싱
- 백업 정책 수립 필요
