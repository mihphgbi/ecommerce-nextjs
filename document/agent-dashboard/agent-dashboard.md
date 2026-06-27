# Agent Dashboard

## Status
In progress

## Overview

The dashboard in this project is the seller/agent management area under `/agent-management`. It is built with the Next.js App Router, client-side React components, Ant Design layout controls, Redux Toolkit async actions, and the `/api/products` route handler backed by Prisma and MongoDB.

The dashboard currently focuses on product management:

- Add a product.
- View the product list.
- Edit an existing product.
- Delete a product after confirmation.

There are no implemented order, customer, revenue, analytics, or inventory-summary dashboard widgets yet.

## Access Control

The dashboard layout is implemented in `src/app/agent-management/layout.tsx`.

Access is based on the NextAuth session:

- Allowed: `session.user.isAgent === true`.
- Rejected: users without the agent flag are redirected to `/`.

The agent flag is sourced from `User.is_agent` in Prisma and mapped to `session.user.isAgent` in `src/lib/auth.ts`.

## Routes

| Route | File | Purpose |
| --- | --- | --- |
| `/agent-management` | `src/app/agent-management/page.tsx` | Dashboard landing page with buttons for add and list product flows. |
| `/agent-management/product-management/add-product` | `src/app/agent-management/product-management/add-product/page.tsx` | Product creation form. |
| `/agent-management/product-management/product-list` | `src/app/agent-management/product-management/product-list/page.tsx` | Product table with edit and delete actions. |

## Layout

The dashboard uses Ant Design `Layout`, `Sider`, `Header`, `Content`, `Menu`, and `Button`.

The sidebar contains:

- `Add Product`, linked to `/agent-management/product-management/add-product`.
- `Product List`, linked to `/agent-management/product-management/product-list`.

The sidebar can collapse and expand through the header button.

## Product Form

The shared product form is implemented in:

`src/app/agent-management/product-management/components/adjust-product-form/adjust-product-form.tsx`

Fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | Yes | Product name. |
| `description` | string | No | Product description. |
| `image` | string | No | Image value, currently captured as plain text. |
| `quality` | number | Yes | Quantity-like inventory field. The app currently uses the name `quality`. |
| `price` | number | Yes | Parsed with `parseFloat`. |
| `is_sale` | boolean | No | Controlled by a checkbox. |
| `sale_price` | number | Required only when sale is checked | Hidden unless `is_sale` is checked. |

The same form is reused for creating and editing products.

## Product List

The product list page dispatches `getProductData()` and reads products from the Redux product slice.

Table columns:

- Name
- Price
- Quality
- Description
- Image
- Sale
- Sale Price
- Action

The action column renders:

- `EditProduct`, which opens an Ant Design modal and updates the product.
- `DeleteProduct`, which opens an Ant Design confirmation modal and deletes the product.

## Data Flow

Dashboard product data flows through these layers:

1. UI components in `src/app/agent-management/product-management/**`.
2. Redux async actions in `src/lib/redux/action/product.ts`.
3. Product slice in `src/lib/redux/store/product/productSlice.ts`.
4. API route handler in `src/app/api/products/route.ts`.
5. Prisma client from `src/lib/db/prisma.ts`.
6. MongoDB collections defined in `prisma/schema.prisma`.

The Redux actions call `${NEXT_PUBLIC_APP_URL}/api/products`, so `NEXT_PUBLIC_APP_URL` must be configured for the dashboard to load and mutate product data correctly.

## API Contract

The product dashboard uses `src/app/api/products/route.ts`.

| Method | Query | Body | Behavior |
| --- | --- | --- | --- |
| `GET` | None | None | Returns all products as `{ data: Product[] }`. |
| `POST` | None | Product payload | Creates a product. |
| `PUT` | `id` | Product update payload | Updates the product with the matching id. |
| `DELETE` | `id` | None | Deletes the product with the matching id. |

## Database Model

The dashboard uses the `Product` model from `prisma/schema.prisma`.

Important mapped fields:

- `id` maps to MongoDB `_id`.
- `is_sale` is a boolean sale flag.
- `sale_price` is optional.
- `quality` is stored as an integer.

The collection is mapped to `products`.

## Current Limitations

- The dashboard only manages products.
- There is no dedicated dashboard summary page with metrics or charts.
- Product image input is a text field, not an upload flow.
- Product table does not define a stable row key.
- Some API errors return generic messages.
- Product API handlers do not currently validate payloads with a schema library.
- The seller access redirect is handled client-side in the layout.

## Suggested Next Improvements

- Add a real dashboard overview page with product count, sale product count, total stock, and recent products.
- Add server-side or middleware-based protection for agent-only routes.
- Validate product API payloads with Zod before writing to Prisma.
- Add row keys and loading/error states to the product table.
- Replace the image text input with an upload or URL validation flow.
- Rename `quality` to `quantity` only if the schema, UI, API, and existing data can be updated together.
