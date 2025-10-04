# DdingCha

A modern, production-ready Next.js homepage for DdingCha - a TikTok-driven e-commerce platform that delivers trending products fast.

## Features

- ⚡ Built with Next.js 14 App Router and TypeScript
- 🎨 Styled with Tailwind CSS and shadcn/ui components
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive and accessible design
- ✨ Form validation with React Hook Form and Zod
- 🔌 API Routes for newsletter, contact, and products

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the project:

```bash
cd ddingcha
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ddingcha/
├── app/
│   ├── api/              # API routes
│   │   ├── contact/
│   │   ├── products/
│   │   └── subscribe/
│   ├── globals.css       # Global styles with theme tokens
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── header.tsx
│   ├── hero.tsx
│   ├── features.tsx
│   ├── steps.tsx
│   ├── showcase.tsx
│   ├── pricing.tsx
│   ├── cta-band.tsx
│   ├── faq.tsx
│   ├── footer.tsx
│   ├── newsletter-form.tsx
│   └── contact-form.tsx
└── lib/
    └── utils.ts          # Utility functions
```

## Theme Customization

All colors are defined using shadcn theme tokens in `app/globals.css`. To customize the theme:

1. Open `app/globals.css`
2. Modify the CSS variables in the `:root` and `.dark` selectors
3. Available tokens:
   - `--background` / `--foreground`
   - `--primary` / `--primary-foreground`
   - `--secondary` / `--secondary-foreground`
   - `--muted` / `--muted-foreground`
   - `--accent` / `--accent-foreground`
   - `--card` / `--card-foreground`
   - `--border` / `--input` / `--ring`

**Important:** Never use hardcoded colors or hex values in components. Always use theme tokens like `text-foreground`, `bg-background`, `border-border`, etc.

## API Routes

### POST /api/subscribe

Subscribe to newsletter.

**Body:**
```json
{
  "email": "user@example.com"
}
```

### POST /api/contact

Submit contact form.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

### GET /api/products

Get product list.

**Response:**
```json
{
  "products": [...]
}
```

## Building for Production

```bash
npm run build
npm start
```

## shadcn/ui Components

The project uses the following shadcn/ui components:

- Button
- Input
- Label
- Textarea
- Card
- Accordion

To add more shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

## License

All rights reserved © DdingCha
