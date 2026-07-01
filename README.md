# Ecommerce Next.js

This is a single Next.js ecommerce application using the App Router, React, TypeScript, Sass, Tailwind, Ant Design, Redux Toolkit, NextAuth, Prisma, and MongoDB.

## Features

- Public storefront landing page at `/`.
- Public product browsing page at `/products`.
- Public product detail route at `/products/[productId]` with static placeholder detail content.
- Credentials and Google authentication through NextAuth.
- User information area under `/user-management/[userId]`.
- Agent-only product management area under `/agent-management`.
- Product type management through the API.
- MongoDB-backed product, product type, and user models through Prisma.

## Getting Started

Install dependencies with npm:

```bash
npm install
```

Create a local `.env` file with the required environment variables for your setup. Do not commit real secrets.

```bash
DATABASE_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
PORT=3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_AUTH_SECRET=
```

Generate the Prisma client when dependencies or the Prisma schema change:

```bash
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` starts Next.js on port `3000`.
- `npm run build` builds the production app.
- `npm run start` starts the built production app.
- `npm run lint` runs Next.js linting.
- `npx prisma generate` regenerates the Prisma client.
- `npx prisma studio` opens Prisma Studio for local data inspection.

There is currently no test script in `package.json`.

## Project Structure

- `src/app/` contains App Router routes, layouts, pages, and API handlers.
- `src/app/(auth)/` contains sign-in and sign-up pages.
- `src/app/(home)/` contains the storefront landing page and auth dialogs.
- `src/app/products/` contains product listing and product detail routes.
- `src/app/agent-management/` contains agent product management screens.
- `src/app/user-management/[userId]/` contains the authenticated user information screen.
- `src/app/api/` contains auth, product, product type, and user route handlers.
- `src/app/components/` contains shared UI such as navigation, footer, forms, sidebar, toast, and checkbox.
- `src/lib/` contains auth, Prisma, and Redux infrastructure.
- `src/model/` contains TypeScript data shapes.
- `src/regex/` contains validation regexes.
- `src/style/` and route-local `*.scss` files contain styling.
- `src/assets/` and `public/` contain static assets.
- `prisma/schema.prisma` defines the MongoDB Prisma schema.
- `database/scripts/changes/` contains one-off MongoDB data-change scripts.
- `document/` contains feature notes for the storefront and agent dashboard.

## API Overview

- `GET /api/products` returns paginated products with optional filters.
- `POST /api/products` creates an agent-owned product.
- `PUT /api/products?id={id}` updates an agent-owned product.
- `DELETE /api/products?id={id}` deletes an agent-owned product.
- `GET /api/product-types` returns product type options.
- `POST /api/product-types` creates a product type for agent users.
- `POST /api/user` creates a user.
- `GET /api/user?name={username}` returns a user for credentials auth.

## Product Query Parameters

`GET /api/products` supports:

- `page`, default `1`.
- `limit`, default `12`, maximum `100`.
- `product_type_id` or `type_id`, filtered by MongoDB ObjectId.
- `is_sale=true` or `is_sale=false`.
- `sort_by=sold_items`.
- `agent_only=true`, which requires an agent session and returns only the signed-in agent's products.

Responses include:

- `data`, an array of products.
- `pagination`, with `page`, `limit`, `total`, `totalPages`, `hasNextPage`, and `hasPreviousPage`.

## Data Model

Prisma uses MongoDB through `DATABASE_URL`.

Current models:

- `Product`, mapped to `products`.
- `ProductType`, mapped to `product_types`.
- `User`, mapped to `user`.

Important product fields include `quality`, `sold_items`, `is_sale`, `sale_price`, `saler_id`, and `product_type_id`.

## Documentation

Feature documentation lives in:

- `document/user/landing_page.md`
- `document/user/product_list.md`
- `document/user/product_item_detail.md`
- `document/agent-dashboard/agent-dashboard.md`
- `database/scripts/changes/README.md`
- `AGENTS.md`
