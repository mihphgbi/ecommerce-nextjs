# Product Item Detail

## Status
In progress

Main files:

- `src/app/products/[productId]/page.tsx`
- `src/app/products/[productId]/style/product-detail.scss`
- `src/app/api/products/product-data.ts`
- `src/app/components/navigations/nav-bar.tsx`
- `src/app/components/footer/footer.tsx`

## Overview

The product item detail page is the user-facing product detail route at `/products/[productId]`.

It is currently implemented as a client component with mostly static content. The route accepts a dynamic `productId` path segment, but the page does not currently read route params or fetch a matching product record.

The page includes:

- Shared navigation header.
- Breadcrumb.
- Product brand and title.
- Price and sale price.
- Review summary.
- Color selector.
- Size selector.
- Quantity input.
- Add-to-cart button.
- Favorite button.
- Product features.
- Description.
- Delivery information.
- Return policy.
- Customer reviews section.
- Shared footer.

## Flow

Default detail flow:

1. User opens `/products/[productId]`.
2. `NavBar` renders the shared storefront navigation.
3. The detail content renders from `src/app/products/[productId]/page.tsx`.
4. The page displays static product information for `Classic T-shirt`.
5. The user can change color and size selectors.
6. The user can enter a quantity.
7. `Footer` renders below the customer review section.

Navigation from product list:

1. User opens `/products`.
2. User clicks a product card image or product name.
3. The product list links to `/products/{product.id}`.
4. The product item detail page renders.

Navigation from landing page Similar Product:

1. User opens `/`.
2. User scrolls to Similar Product.
3. User clicks a similar product card.
4. The card links to `/products/{item.id}`.
5. The product item detail page renders instead of the product list page.

## User States

### Not Logged In

The product item detail page is publicly browsable.

Expected available actions:

- View product information.
- Change color and size selectors.
- Enter quantity.
- Click Add to cart.
- Click favorite.
- Use shared navigation sign-in and sign-up controls.

Current limitation:

- Add-to-cart and favorite buttons are visible but do not currently persist data.

### Logged In

The product item detail page currently behaves the same for logged-in users.

Expected available actions:

- View product information.
- Use selectors and quantity input.
- Use account controls from the shared navigation.
- Sign out from the shared navigation.

Current limitation:

- The page does not currently store cart or favorite actions for logged-in users.

### Agent User

Agent status is not used directly on the product item detail page.

Agent users can view the detail page like normal users. Product management remains under `/agent-management`.

## Current UI Behavior

- The dynamic route segment exists, but the page content is static.
- Breadcrumb labels are static: Men, Clothing, T-shirt.
- Product title is static: `Classic T-shirt`.
- Brand is static: `Noname brand`.
- Price and sale price are static.
- Color selector stores the selected value in local component state.
- Size selector reuses the same `handleChange` function as the color selector.
- Quantity input is visible but not connected to cart behavior.
- Add-to-cart button is visible but has no handler.
- Favorite button is visible but has no handler.
- Customer review cards use `ProductData` from `src/app/api/products/product-data.ts`.
- Customer review cards use placeholder product image data.
- The page now includes the shared navigation header and footer.

## API

The product item detail page currently does not call an API.

Related existing API:

- `GET /api/products`
- `POST /api/products`
- `PUT /api/products?id={id}`
- `DELETE /api/products?id={id}`

There is no current API route for fetching one product by `id`.

If this page becomes data-driven, likely options are:

- Add `GET /api/products?id={id}` support.
- Add a nested route such as `GET /api/products/[productId]`.
- Fetch all products with `GET /api/products` and find the matching record client-side, although this is less efficient.

## Current Gaps

- The page does not read `productId` from route params.
- Product detail content is static.
- Product images are missing in the main detail area.
- Add-to-cart action is not implemented.
- Favorite action is not implemented.
- Quantity input is not validated.
- Color and size options are static.
- Customer reviews are static and not tied to the selected product.
- The page does not show loading, not-found, or error states.
- The page does not use live product records from Prisma.

## Suggested Improvements

- Read `productId` from route params and fetch the matching product.
- Add a single-product API route or extend `GET /api/products` to support an `id` query.
- Render product name, description, price, sale price, and image from live data.
- Add a real main product image/gallery area.
- Wire Add to cart to cart state.
- Wire favorite to wishlist state.
- Validate quantity input.
- Replace static customer review cards with product-specific data or remove them until reviews exist.
- Add not-found handling when a product id does not exist.
