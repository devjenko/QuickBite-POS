
<div align="center">
  
# The QuickBite POS System

Implemented with serverless architecture, REST APIs, and a cloud-hosted database, optimizing scalability and performance.

<br/>

<img width="800" height="400" alt="ezgif com-optimize" src="https://github.com/user-attachments/assets/a8c4b76a-6221-49fb-a7cd-f1e975d49442" />


<br/>

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-v5-black?style=for-the-badge&logo=nextdotjs)
![Zustand](https://img.shields.io/badge/Zustand-brown?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![Sonner](https://img.shields.io/badge/Sonner-black?style=for-the-badge&logo=react)

</div>




##  Features

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

##  Project Structure

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

##  Database Schema

### User
- Business accounts with unique `businessId`
- Hashed passwords
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

##  Key Features in Detail

### Multi-tenant Architecture
Each business user has a unique `businessId` and can only access and manage their own menu items. Data is isolated at the database level using user ID filtering.

### Image Optimization
Menu item images are automatically optimized using Cloudinary's transformation API, ensuring fast loading times and optimal image quality.

### Persistent Shopping Cart
The shopping cart uses Zustand with localStorage persistence, so cart items remain even after page refreshes or browser restarts.

### Server-Side Rendering
Leverages Next.js App Router for optimal performance with server components for data fetching and client components for interactivity.

## License

This project is private and proprietary.

## Author

**Brandon Jenkins [devjenko]**

---



