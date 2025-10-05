# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DdingCha is a TikTok-driven **e-commerce shopping mall** built with **Next.js 15**, **React 19**, TypeScript, and Tailwind CSS. The platform delivers trending products with a focus on fast delivery and seamless shopping experience. This is NOT a subscription service - it's an online shopping platform.

## Architecture: FSD (Feature-Sliced Design) in Next.js 15

This project uses **pure FSD architecture** inside the Next.js 15 app directory, without underscore prefixes.

### Directory Structure

```
app/
├── shared/               # Layer 1: Shared resources
│   ├── ui/              # Shadcn UI components (button, card, input, etc.)
│   ├── lib/             # Utilities (cn, formatters)
│   └── config/          # Constants (categories, etc.)
├── entities/            # Layer 2: Business entities
│   └── product/
│       └── model/       # Product types, mock data
├── features/            # Layer 3: User features
│   └── product-card/    # Product card with interactions
│       └── ui/
├── widgets/             # Layer 4: Page sections
│   ├── hero-carousel/
│   ├── category-section/
│   ├── product-grid/
│   ├── header/
│   ├── footer/
│   ├── features/
│   ├── steps/
│   ├── cta-band/
│   └── faq/
├── api/                 # API routes
│   ├── contact/
│   ├── products/
│   └── subscribe/
├── page.tsx             # Layer 5: Pages (composes widgets)
├── layout.tsx           # Root layout
└── globals.css          # Global styles
```

### FSD Layer Rules

1. **shared/** - Foundation layer. No imports from other FSD layers.
2. **entities/** - Business entities. Can import from `shared`.
3. **features/** - User interactions. Can import from `shared` + `entities`.
4. **widgets/** - Composite UI. Can import from `shared` + `entities` + `features`.
5. **page.tsx** - Page composition. Can import from all layers.

**Rule**: Upper layers can import from lower layers, but NOT vice versa.

### Import Pattern

Use **shorter aliases** for FSD layers:
```tsx
// ✅ Correct - Short aliases
import { Button } from '@/shared/ui/button'
import { ProductCard } from '@/features/product-card'
import { CATEGORIES } from '@/shared/config/categories'
import { Product } from '@/entities/product/model/types'
import { Header } from '@/widgets/header'

// ❌ Wrong
import { Button } from '@/app/shared/ui/button'  // Too long
import { Button } from '@/components/ui/button'  // Old path
import { ProductCard } from '../features/product-card'  // Relative
```

**Path aliases configured in `tsconfig.json`:**
- `@/shared/*` → `./app/shared/*`
- `@/entities/*` → `./app/entities/*`
- `@/features/*` → `./app/features/*`
- `@/widgets/*` → `./app/widgets/*`

### Next.js 15 Routing

- Folders in `app/` become routes UNLESS they are FSD layers (shared, entities, features, widgets)
- These folders won't create routes because they don't contain `page.tsx`
- Only `app/page.tsx` creates the `/` route
- `app/api/` folders create API routes

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Page Architecture

### Current Page Structure
Homepage (`app/page.tsx`) composition:
1. **Header** - Navigation, cart, search
2. **HeroCarousel** - Rotating banner with featured products (Embla Carousel)
3. **CategorySection** - 8 category grid with icons
4. **Features** - Why choose DdingCha (3 features)
5. **ProductGrid** - Trending products with filtering
6. **Steps** - How it works (3 steps)
7. **CtaBand** - Promotional banner with CTA
8. **Faq** - Accordion FAQ section
9. **Footer** - Site footer with links

### Layout
Root layout (`app/layout.tsx`) defines:
- Metadata and SEO (OpenGraph, Twitter)
- Nanum Gothic font (Korean web font)
- `lang="ko"` for Korean language

### API Routes
All API routes are stubs that log to console. In production, these should connect to a database or external service:
- `POST /api/subscribe` - Newsletter subscription for marketing updates (validates email with Zod)
- `POST /api/contact` - Customer inquiry form (validates name, email, message with Zod)
- `GET /api/products` - Product catalog endpoint for the shopping mall

### Form Handling Pattern
Client-side forms use a consistent pattern:
1. React Hook Form with Zod validation (`@hookform/resolvers/zod`)
2. Loading states with `Loader2` spinner from `lucide-react`
3. Success/error states with auto-dismiss after 5 seconds
4. Proper accessibility attributes (aria-invalid, aria-describedby, role="alert")

See `components/newsletter-form.tsx` and `components/contact-form.tsx` for reference implementations.

### Component Organization (FSD Layers)

**Current Structure**:
- `app/shared/ui/` - Shadcn UI primitives (button, input, card, etc.)
- `app/shared/lib/` - Utilities (cn, helpers)
- `app/shared/config/` - Constants (categories, etc.)
- `app/entities/` - Business entities (product, category models)
- `app/features/` - User interactions (product-card, filters)
- `app/widgets/` - Page sections (header, hero-carousel, product-grid, etc.)

**Legacy** (DO NOT USE):
- `components/` - Old structure, being removed
- `lib/` - Old utilities location
- `src/` - Old source directory

**Path aliases** (configured in `tsconfig.json`):
- `@/*` - Project root
- `@/shared/*` - Shared resources (UI, lib, config)
- `@/entities/*` - Business entities
- `@/features/*` - User features
- `@/widgets/*` - Page widgets

### Styling System - COLOR USAGE RULES

**CRITICAL - MANDATORY COLOR SYSTEM**: You MUST use ONLY the theme tokens defined in `app/globals.css`. This is a strict requirement.

**Available color tokens** (defined as HSL values in `app/globals.css`):

**Layout colors:**
- `background` / `foreground` - Main page background and text
- `border` - All borders
- `input` - Form input borders
- `ring` - Focus ring color

**Component colors:**
- `card` / `card-foreground` - Card components
- `popover` / `popover-foreground` - Popover/dropdown components

**Semantic colors:**
- `primary` / `primary-foreground` - Primary actions, CTAs
- `secondary` / `secondary-foreground` - Secondary UI elements
- `muted` / `muted-foreground` - Subdued text and backgrounds
- `accent` / `accent-foreground` - Highlighted elements
- `destructive` / `destructive-foreground` - Error states, delete actions

**Theme support:**
- Light mode: `:root`
- Dark mode: `.dark` class

**Usage rules:**
```tsx
// ✅ CORRECT - Use theme tokens
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="border-border bg-card text-card-foreground"
className="bg-muted text-muted-foreground"

// ❌ WRONG - NEVER use these
className="bg-white text-black"           // Hardcoded colors
className="bg-gray-100 text-gray-900"     // Tailwind color classes
className="bg-[#ffffff] text-[#000000]"   // Arbitrary values
className="bg-blue-500"                   // Any Tailwind color
style={{ backgroundColor: '#fff' }}       // Inline styles with colors
```

**When working with colors:**
1. ALWAYS use the theme token system
2. NEVER use Tailwind color utilities (gray-*, blue-*, red-*, etc.)
3. NEVER use hex codes, RGB, or any hardcoded color values
4. If you need a new color, update `app/globals.css` CSS variables first
5. All components must respect both light and dark mode automatically

### Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add [component-name]
```

Current components: Button, Input, Label, Textarea, Card, Accordion

## TypeScript Configuration

- Path mapping: `@/*` resolves to project root
- Strict mode enabled
- Module resolution: "bundler"

## Key Dependencies

- **Framework**: Next.js 15.5.4, React 19.2.0
- **Forms**: `react-hook-form` + `zod` + `@hookform/resolvers`
- **UI**: `@radix-ui/*` primitives via shadcn/ui
- **Animations**: `framer-motion`
- **Carousel**: `embla-carousel-react` (for hero carousel)
- **Icons**: `lucide-react` 0.544.0
- **Styling**: `tailwindcss`, `class-variance-authority`, `tailwind-merge`
- **Fonts**: Noto Sans KR (Google Fonts, weights: 300, 400, 500, 700, 900)

## Shopping Mall Features

### Hero Carousel
- Auto-rotating banner (5 second interval)
- Manual navigation with prev/next buttons
- Displays featured products and promotional banners
- Location: `app/widgets/hero-carousel/ui/HeroCarousel.tsx`

### Category System
- 8 main categories: 전자기기, 패션/의류, 뷰티, 홈/리빙, 스포츠/레저, 식품, 키즈/베이비, 반려동물
- Each category has icon, name, and gradient color
- Config: `app/shared/config/categories.ts`
- UI: `app/widgets/category-section/ui/CategorySection.tsx`

### Product Display
- Product entity type: `app/entities/product/model/types.ts`
- Mock products: `app/entities/product/model/mock-products.ts`
- Product card feature: `app/features/product-card/ui/ProductCard.tsx`
- Product grid widget: `app/widgets/product-grid/ui/ProductGrid.tsx`

Each product includes:
- Name, price, originalPrice, discount %
- Rating, review count
- Category, trending badge
- Wishlist and quick-add functionality

## Adding New Features (FSD + Next.js 15)

### Adding Shared UI Component
```bash
npx shadcn@latest add [component-name]
# Automatically adds to app/shared/ui/
```

### Adding a New Widget
1. Create directory: `app/widgets/[widget-name]/ui/`
2. Create component: `[WidgetName].tsx`
3. Add `"use client"` if interactive
4. Create barrel export: `app/widgets/[widget-name]/index.ts`
5. Import in `app/page.tsx` using `@/widgets/[widget-name]`

### Adding a New Feature
1. Create directory: `app/features/[feature-name]/ui/`
2. Create component with business logic
3. Import from `@/shared/` and `@/entities/`
4. Export via barrel file: `app/features/[feature-name]/index.ts`

### Adding a New Entity
1. Create directory: `app/entities/[entity-name]/model/`
2. Define TypeScript types in `types.ts`
3. Add mock data or API calls
4. Export via barrel file: `app/entities/[entity-name]/index.ts`

### FSD Import Rules
```tsx
// shared/ - Can only import from external libraries
import { clsx } from 'clsx'

// entities/ - Can import from shared/
import { CategoryId } from '@/shared/config/categories'

// features/ - Can import from shared/ + entities/
import { Product } from '@/entities/product/model/types'
import { Button } from '@/shared/ui/button'

// widgets/ - Can import from all lower layers
import { ProductCard } from '@/features/product-card'
import { MOCK_PRODUCTS } from '@/entities/product/model/mock-products'
```

### Server vs Client Components
- **Server Components** (default): Static content, data fetching, SEO
- **Client Components** (`"use client"`): Interactivity, hooks, event handlers
- Use Server Components by default, only use Client when needed
