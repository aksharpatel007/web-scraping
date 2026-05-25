# ScrapShop Ecommerce

Full-stack ecommerce scaffold with a simple frontend, clean layout, and production-ready Node/Express backend.

## Stack
- Frontend: React, Tailwind CSS, Framer Motion, GSAP
- Backend: Node.js, Express.js
- Auth: JWT + secure HttpOnly cookie sessions + role-based route protection
- Database: MongoDB (Mongoose)

## Project Structure
- `frontend/`: React app, shared layout, product pages, auth pages
- `backend/`: auth, products, orders, admin routes, CSV import pipeline

## Run Backend
1. `cd backend`
2. `copy .env.example .env`
3. update `MONGODB_URI` and `JWT_SECRET`
4. `npm install`
5. `npm run dev`

## Run Frontend
1. `cd frontend`
2. `copy .env.example .env`
3. `npm install`
4. `npm run dev`

## Included Features
- Simple sticky navbar with search, wishlist, and cart controls
- Product listing/details/cart/checkout/auth/dashboard flows
- Protected routes and admin-only panel
- CSV upload endpoint for scraped product ingestion and dynamic product rendering
- Mobile-first responsive layouts with a clean ecommerce-focused UI
