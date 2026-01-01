# QuickBite POS System

An elegant and modern Point of Sale (POS) system designed for fast food restaurants. QuickBite enables businesses to manage their menu items, process orders, and handle checkout seamlessly.

![QuickBite](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)

## 🚀 Features

### Authentication & Security
- **Secure Login System**: Business ID and password-based authentication
- **User Registration**: Sign up with unique business ID
- **Password Reset**: Forgot password functionality
- **Session Management**: JWT-based sessions with NextAuth.js
- **Protected Routes**: Server-side route protection

### Menu Management
- **Add Menu Items**: Create items with name, description, price, category, and images
- **Delete Menu Items**: Remove items from your menu
- **Category Organization**: Organize items by categories (breakfast, lunch, dinner, burgers, pizzas, drinks, desserts, etc.)
- **Image Upload**: Cloudinary integration for optimized image storage
- **Multi-tenant**: Each business has its own isolated menu

### Shopping Cart
- **Add to Cart**: Quick add items to cart
- **Quantity Management**: Increase/decrease item quantities
- **Persistent Cart**: Cart state persists across sessions using localStorage
- **Cart Sidebar**: Easy access to cart from any page

### Checkout & Orders
- **Order Review**: Review items before checkout
- **Payment Interface**: Payment section UI (ready for integration)
- **Order Management**: Orders page structure (ready for implementation)

### Dashboard
- **Welcome Screen**: Personalized greeting
- **Date Display**: Current date information
- **Navigation Hub**: Quick access to all features

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) with React 19
- **Language**: TypeScript
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) v5 (beta)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Image Storage**: [Cloudinary](https://cloudinary.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/pnpm
- **PostgreSQL** database
- **Cloudinary** account (for image uploads)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quickbite-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/quickbite?schema=public"

   # NextAuth
   AUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # (Optional) Open Prisma Studio to view your data
   npx prisma studio
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
quickbite-app/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   ├── sign-up/
│   │   └── forgot-password/
│   ├── (pos)/               # POS system routes
│   │   ├── (dashboard)/     # Dashboard routes
│   │   │   ├── dashboard/
│   │   │   ├── inventory/
│   │   │   ├── orders/
│   │   │   └── settings/
│   │   ├── menu/            # Menu pages
│   │   │   └── [category]/  # Dynamic category pages
│   │   └── checkout/        # Checkout page
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication API
│   │   └── menu-items/      # Menu items API
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── menu/              # Menu components
│   ├── sidebar/           # Sidebar components
│   ├── shared/            # Shared components
│   └── ui/                # UI components
├── lib/                    # Utility libraries
│   ├── prisma.ts          # Prisma client
│   ├── cloudinary.ts      # Cloudinary config
│   └── utils.ts           # Utility functions
├── prisma/                 # Database schema
│   ├── schema.prisma      # Prisma schema
│   └── migrations/        # Database migrations
├── store/                  # State management
│   └── cart-store.ts      # Zustand cart store
├── types/                  # TypeScript types
└── public/                 # Static assets
```

## 🗄️ Database Schema

### User
- Business accounts with unique `businessId`
- Hashed passwords
- Profile images
- One-to-many relationship with MenuItems

### MenuItem
- Name, description, price
- Category classification
- Image URLs (Cloudinary)
- Availability status
- User ownership

### Account & Session
- NextAuth.js session management
- OAuth account linking support

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `AUTH_SECRET` | Secret key for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Base URL of your application | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

## 🎨 Key Features in Detail

### Multi-tenant Architecture
Each business user has a unique `businessId` and can only access and manage their own menu items. Data is isolated at the database level using user ID filtering.

### Image Optimization
Menu item images are automatically optimized using Cloudinary's transformation API, ensuring fast loading times and optimal image quality.

### Persistent Shopping Cart
The shopping cart uses Zustand with localStorage persistence, so cart items remain even after page refreshes or browser restarts.

### Server-Side Rendering
Leverages Next.js App Router for optimal performance with server components for data fetching and client components for interactivity.

## 🚧 Roadmap

- [ ] Complete orders management functionality
- [ ] Implement inventory tracking
- [ ] Add payment processing integration
- [ ] Real-time order updates
- [ ] Analytics and reporting dashboard
- [ ] Multi-location support
- [ ] Staff management and roles
- [ ] Receipt printing
- [ ] Customer management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and proprietary.

## 👤 Author

**Brandon**

---

Built with ❤️ using Next.js and TypeScript

