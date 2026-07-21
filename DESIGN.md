# Fashion Oasis - Design & Technical Architecture Document

## Project Overview
**Fashion Oasis** is a modern e-commerce website for handcrafted jewelry and fashion accessories. It's a single-page application (SPA) built with React, featuring a clean and elegant design for showcasing and selling jewelry products.

## Tech Stack

### Core Framework
- **React 19.2.7** - Latest React version with modern hooks and features
- **Vite 8.1.1** - Fast build tool and development server with Hot Module Replacement (HMR)
- **JavaScript (ES6+)** - Using modern JavaScript features

### Routing & Navigation
- **React Router DOM 7.18.1** - Client-side routing for SPA navigation
  - BrowserRouter for routing
  - Routes and Route components for page configuration
  - useNavigate hook for programmatic navigation
  - useParams for dynamic route parameters
  - useSearchParams for URL query parameters

### Styling & UI Framework
- **Bootstrap 5.3.8** - CSS framework for responsive design and pre-built components
- **Bootstrap Icons 1.13.1** - Icon library for UI elements
- **Custom CSS** - Component-specific styling with separate CSS files

### Animation & Visual Effects
- **Framer Motion 12.42.2** - Production-ready animation library for smooth transitions and interactions
- **React Slick 0.31.0 + Slick Carousel 1.8.1** - Carousel/slider component for product showcases
- **Swiper 14.0.5** - Modern touch slider library for mobile-friendly carousels

### Icons
- **React Icons 5.7.0** - Comprehensive icon library including Font Awesome, Feather Icons, and more

### Development Tools
- **Oxlint 1.71.0** - Fast JavaScript/React linter with React-specific rules
  - React rules of hooks enforcement
  - React only-export-components rule
  - Oxc-based linting for performance

## Project Structure

```
fashion-oasis/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navbar/        # Navigation bar component
│   │   ├── Hero/          # Hero section component
│   │   ├── Categories/    # Product categories display
│   │   ├── FeaturedProducts/  # Featured products showcase
│   │   ├── WhyChooseUs/   # Features/benefits section
│   │   ├── SpecialOffer/  # Special offers/promotions
│   │   ├── Testimonials/  # Customer testimonials
│   │   ├── Footer/        # Footer component
│   │   ├── Shop/          # Shop page components
│   │   │   ├── HeroBanner/    # Shop hero banner
│   │   │   ├── Sidebar/        # Filter sidebar
│   │   │   ├── SearchSort/     # Search and sort toolbar
│   │   │   ├── ProductGrid/   # Product grid layout
│   │   │   ├── Pagination/    # Pagination component
│   │   │   └── ProductCard/   # Individual product card
│   │   └── ProductDetails/    # Product details page components
│   │       ├── ProductGallery/   # Image gallery with thumbnails
│   │       ├── ProductInfo/      # Product information panel
│   │       ├── ProductActions/   # Add to cart, quantity, wishlist
│   │       ├── ServiceFeatures/  # Service feature badges
│   │       ├── RelatedProducts/  # Related products carousel
│   │       ├── ProductTabs/      # Product description/reviews tabs
│   │       └── RecentlyViewed/   # Recently viewed products
│   ├── pages/             # Main page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Shop/          # Shop page with filtering
│   │   │   └── Shop.jsx
│   │   │   └── Shop.css
│   │   └── ProductDetails.jsx  # Individual product page
│   │   └── ProductDetails.css
│   ├── data/              # Data files
│   │   └── products.js    # Product data with gallery arrays
│   ├── assets/            # Images and static assets
│   │   ├── shop/          # Shop product images
│   │   └── viewproducts/  # Product detail gallery images
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Application entry point
│   ├── index.css          # Global styles
│   └── App.css            # App-specific styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── .oxlintrc.json         # Linting configuration
```

## Architecture & Design Patterns

### Component Architecture
- **Functional Components** - All components are functional using React hooks
- **Component Composition** - Complex UI built from smaller, reusable components
- **Separation of Concerns** - Each component has its own CSS file for styling
- **Props-Driven** - Components receive data through props for reusability

### State Management
- **Local Component State** - useState hooks for component-specific state
- **URL-Based State** - Using React Router for navigation and query parameters
- **No Global State** - Currently using local state; could be extended with Context API or Redux for cart/wishlist

### Data Management
- **Hardcoded Data** - Product data is currently stored in component arrays
- **No Backend Integration** - Static data model (ready for API integration)
- **Client-Side Filtering** - Search, filter, and sort operations performed in browser

## Page Routes & Features

### 1. Home Page (`/`)
**Purpose:** Landing page with brand showcase and featured products

**Components:**
- Navbar - Navigation with logo and menu
- Hero - Large hero section with call-to-action
- Categories - Display of product categories
- FeaturedProducts - Highlighted products carousel
- WhyChooseUs - Brand benefits and features
- SpecialOffer - Promotional banners
- Testimonials - Customer reviews
- Footer - Site navigation and links

### 2. Shop Page (`/shop`)
**Purpose:** Product catalog with comprehensive filtering and search

**Features:**
- **Hero Banner** - Full-width premium banner with overlay
- **Category Filtering** - Filter by: All, Necklaces, Earrings, Rings, Bracelets, Mangalsutra, Wedding
- **Price Range Filter** - Slider-based price range filtering (₹499 - ₹5000)
- **Material Filter** - Multi-select filter: Gold Plated, Rose Gold, Silver, Pearl, Diamond, Kundan
- **Occasion Filter** - Multi-select filter: Daily Wear, Party Wear, Wedding, Festive, Gift
- **Search Functionality** - Real-time search by product name
- **Sorting Options** - Popularity, Newest, Price Low to High, Price High to Low
- **Clear Filters** - Reset all filters with one click
- **Filter Logic** - AND across categories, OR within same category
- **Product Cards** - Display with image, name, rating, price, discount, and actions
- **Wishlist Button** - Add products to wishlist
- **View Details** - Navigate to product details page
- **Pagination** - Navigate through product pages

**Product Categories:**
- Necklaces
- Earrings
- Rings
- Bracelets
- Mangalsutra
- Wedding

### 3. Product Details Page (`/product/:id`)
**Purpose:** Detailed product view with purchase options

**Features:**
- **Image Gallery** - Multiple product images with thumbnail navigation (using gallery array)
- **Product Information** - Name, category, rating, reviews count, stock status
- **Pricing** - Displayed in Indian Rupees (₹) with discount badge
- **Description** - Detailed product description
- **Product Specifications** - Grid layout of product details
- **Quantity Selector** - Increment/decrement quantity
- **Add to Cart** - Add selected quantity to cart
- **Buy Now** - Direct purchase option
- **Wishlist** - Add to wishlist functionality
- **Service Features** - Full-width badges: Free Shipping, 30-Day Returns, Authenticity Certificate, Secure Payment
- **Product Tabs** - Description, Reviews, Shipping tabs
- **Related Products** - Swiper carousel of similar products from same category
- **Recently Viewed** - Grid of recently viewed products
- **Breadcrumb Navigation** - Return to shop page

## Component Details

### Navbar Component
- Responsive navigation bar
- Logo and brand name
- Navigation links (Home, Shop)
- Cart and wishlist icons
- Mobile-friendly menu

### Hero Component
- Large banner image
- Headline and subheadline
- Call-to-action buttons
- Background overlay for text readability

### Featured Products Component
- Carousel/slider for featured items
- Product cards with quick actions
- Auto-play or manual navigation

### Categories Component
- Grid layout of category cards
- Category images and names
- Click to filter in shop page

### Why Choose Us Component
- Feature highlights with icons
- Benefits like quality, shipping, support
- Clean card-based layout

### Special Offer Component
- Promotional banner
- Limited-time offers
- Eye-catching design

### Testimonials Component
- Customer review cards
- Rating display
- Customer quotes and names

### Footer Component
- Site navigation links
- Contact information
- Social media links
- Newsletter signup

### Shop Page Components

#### HeroBanner Component
- Full-width premium banner with overlay
- Responsive height (desktop ~480px, scales down on mobile)
- Centered text with dark overlay
- Hero image from assets/shop/hero-banner.jpg

#### Sidebar Component
- Category filter with counts
- Price range slider (₹499 - ₹5000)
- Material multi-select checkboxes
- Occasion multi-select checkboxes
- Clear Filters button
- Sticky positioning on desktop

#### SearchSort Component
- Search input with clear button
- Sort dropdown (Popularity, Newest, Price Low-High, Price High-Low)
- Product count display
- Clear Filters link (shows when filters active)

#### ProductGrid Component
- Responsive grid layout
- ProductCard components
- Gap and column adjustments for breakpoints

#### ProductCard Component
- Product image with aspect ratio 4/3
- Discount badge
- Wishlist button
- Product name (2-line clamp)
- Rating with stars and review count
- Price row with current price and old-price
- View Details button
- Hover effects with pink glow
- Scoped price styling (.product-card .price-row .price)

#### Pagination Component
- Page number buttons
- Active state styling
- Hover effects

### Product Details Page Components

#### ProductGallery Component
- Accepts product prop with gallery array
- Safe fallback for products without gallery
- Thumbnail navigation with active state
- Main image preview with hover zoom
- Fluid responsive sizing (flex: 1, max-width: 520px, aspect-ratio: 1/1)

#### ProductInfo Component
- Product name and rating
- Stock status badge
- Price section with discount
- Product description
- Product specifications grid (2 columns)
- min-width: 0 for flex overflow prevention

#### ProductActions Component
- Quantity selector with +/- buttons
- Add to Cart button (gradient)
- Buy Now button (outline)
- Wishlist button (icon)
- Responsive layout (stacks on mobile)
- width: 100% and min-width: 0 for overflow prevention

#### ServiceFeatures Component
- Full-width service feature badges
- Features: Free Shipping, 30-Day Returns, Authenticity Certificate, Secure Payment
- Responsive layout (wraps on mobile)
- Card-based design with icons

#### RelatedProducts Component
- Swiper carousel for related products
- Uses ProductCard component
- Filters products by category
- Section title with divider
- Responsive breakpoints (1, 2, 4 slides)

#### ProductTabs Component
- Tab navigation (Description, Reviews, Shipping)
- Tab content with animations
- Responsive layout

#### RecentlyViewed Component
- Grid layout for recently viewed products
- Uses ProductCard component
- Section heading
- Responsive grid (4, 2, 1 columns)

## Styling Approach

### Bootstrap Integration
- Bootstrap 5 grid system for responsive layouts
- Bootstrap components for buttons, forms, cards
- Custom CSS overrides for brand consistency
- Bootstrap Icons for iconography

### Custom CSS
- Component-specific CSS files for maintainability
- Custom color scheme and typography
- Responsive design with media queries
- Hover effects and transitions

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Flexible grid layouts
- Touch-friendly interactions

## Data Model

### Product Object Structure
```javascript
{
  id: number,
  name: string,
  category: string,
  material: string,        // Gold Plated, Rose Gold, Silver, Pearl, Diamond, Kundan
  occasion: string,        // Daily Wear, Party Wear, Wedding, Festive, Gift
  image: string,           // Main product image
  gallery: string[],       // Array of gallery images for product details
  price: number,
  oldPrice: number,
  discount: number,
  rating: number,
  reviews: number
}
```

### Current Product Data
- 12 sample products across categories
- Price range: ₹699 - ₹4,999
- Rating range: 4.5 - 5.0
- Categories: Necklaces, Earrings, Rings, Bracelets, Mangalsutra, Wedding
- Materials: Gold Plated, Rose Gold, Silver, Pearl, Diamond, Kundan
- Occasions: Daily Wear, Party Wear, Wedding, Festive, Gift
- Gallery images for Product 1 (5 images in viewproducts folder)

## Future Enhancement Opportunities

### Backend Integration
- Connect to REST API or GraphQL
- Implement real database (MongoDB, PostgreSQL)
- User authentication and authorization
- Shopping cart persistence

### E-commerce Features
- Shopping cart with quantity management
- Checkout process
- Payment integration (Stripe, Razorpay)
- Order management
- User accounts and profiles

### Advanced Features
- Product search with filters
- Advanced filtering (price range, brand, material)
- Product comparison
- Recently viewed products
- Wishlist management
- Product reviews and ratings

### Performance Optimization
- Image optimization and lazy loading
- Code splitting and route-based chunking
- Server-side rendering (Next.js migration)
- Caching strategies

### SEO
- Meta tags optimization
- Structured data markup
- Sitemap generation
- Server-side rendering for SEO

## Development Workflow

### Available Scripts
```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run lint     # Run Oxlint for code quality
npm run preview  # Preview production build
```

### Development Server
- Vite dev server with fast HMR
- Default port: 5173
- Hot module replacement for instant updates

### Build Process
- Vite optimization for production
- Minification and bundling
- Asset optimization
- Tree shaking for unused code elimination

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Key Design Decisions

### Why React 19?
- Latest features and performance improvements
- Better concurrent rendering
- Improved developer experience
- Strong ecosystem and community support

### Why Vite?
- Extremely fast development server
- Optimized build process
- Native ES modules support
- Better developer experience than Create React App

### Why Bootstrap?
- Rapid development with pre-built components
- Responsive grid system
- Consistent design patterns
- Large community and documentation

### Why Multiple Carousel Libraries?
- React Slick for feature-rich carousels
- Swiper for mobile-optimized, touch-friendly sliders
- Flexibility to choose best tool for each use case

## Current Limitations

1. **No Backend** - All data is hardcoded in components
2. **No Cart Persistence** - Cart data is lost on refresh
3. **No User Authentication** - No login/signup functionality
4. **No Payment Processing** - No checkout or payment integration
5. **Limited Search** - Basic name-only search
6. **No Reviews System** - Reviews are hardcoded
7. **No Inventory Management** - No stock tracking

## Security Considerations

- Input sanitization needed for user inputs
- CSRF protection for future form submissions
- Secure payment integration required
- User data protection for authentication
- HTTPS for production deployment

## Deployment Considerations

- Static site deployment (Vercel, Netlify, GitHub Pages)
- Environment variable management
- CDN for asset delivery
- SSL certificate for HTTPS
- Performance monitoring

## Conclusion

Fashion Oasis is a well-structured React e-commerce application with a modern tech stack and clean component architecture. It provides a solid foundation for a full-featured jewelry e-commerce platform. The current implementation focuses on frontend presentation and user experience, with clear paths for backend integration and advanced e-commerce features.
