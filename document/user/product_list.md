# Product List

## Status
In progress

Main files:

- `src/app/products/page.tsx`
- `src/app/products/style.scss`
- `src/app/components/navigations/nav-bar.tsx`
- `src/app/components/footer/footer.tsx`
- `src/assets/pre-product-img.png`

## Overview

The product list page is the user-facing product browsing page at `/products`.

It is currently implemented as a client component with static product data inside `src/app/products/page.tsx`. The page does not currently fetch live product records from `/api/products`.

The page includes:

- Shared navigation header.
- Product overview hero.
- Search input.
- Category selector.
- Sort selector.
- Sidebar category filters.
- Price range slider.
- Product card grid.
- Shared footer.

## Product Data

Product data is currently stored in a local `products` array in `src/app/products/page.tsx`.

Each product item includes:

- `id`
- `category`
- `name`
- `description`
- `price`
- `salePrice`
- `rating`
- `tag`

Current categories:

- All
- Sneakers
- Bags
- Accessories
- Home

## Flow

Default browsing flow:

1. User opens `/products`.
2. `NavBar` renders the shared storefront navigation.
3. The product overview hero introduces the collection.
4. The toolbar renders search, category, and sort controls.
5. The sidebar renders category buttons and a price range slider.
6. The product grid renders cards from the local `products` array.
7. `Footer` renders below the product list.

Category filter flow:

1. User chooses a category from the top select or sidebar button list.
2. `selectedCategory` updates in local React state.
3. `filteredProducts` recomputes with `useMemo`.
4. The product grid displays matching products.

Sort flow:

1. User chooses a sort option.
2. `sortBy` updates in local React state.
3. `filteredProducts` recomputes with `useMemo`.
4. Products are sorted by featured rating, price low to high, or price high to low.

Product detail navigation flow:

1. User clicks a product card image or product name.
2. The page routes to `/products/{product.id}`.
3. The dynamic product detail page renders from `src/app/products/[productId]/page.tsx`.

## User States

### Not Logged In

The product list page is publicly browsable.

Expected available actions:

- View product cards.
- Filter by category.
- Change sort order.
- Adjust the price range slider.
- Open product item detail pages.
- Use the shared navigation sign-in and sign-up controls.

### Logged In

The product list page currently behaves the same for logged-in users.

Expected available actions:

- View and filter product cards.
- Open product item detail pages.
- Use account controls from the shared navigation.
- Sign out from the shared navigation.

### Agent User

Agent status is not used directly on the product list page.

Agent users can still browse the product list as normal users. Agent-only management features live under `/agent-management`.

## Current UI Behavior

- Search input is visible but does not currently filter products.
- Category select and sidebar category buttons both update the same `selectedCategory` state.
- Price range slider is visible but does not currently filter products.
- Product cards use the placeholder image `src/assets/pre-product-img.png`.
- `Add` and save buttons are visible on product cards but do not currently perform cart or wishlist actions.
- Sale products display a sale price and deleted original price.

## API

The product list page currently does not call an API.

Related existing API:

- `GET /api/products`
- `POST /api/products`
- `PUT /api/products?id={id}`
- `DELETE /api/products?id={id}`

These routes are currently used by the agent dashboard product management flow.

If the product list becomes API-driven, `GET /api/products` is the likely source for product cards.

## Current Gaps

- Product list data is static instead of API-driven.
- Search input does not filter products.
- Price range slider does not filter products.
- Add-to-cart action is not implemented.
- Wishlist/save action is not implemented.
- Product cards use placeholder imagery.
- Category options are static.
- Product list does not show loading, empty, or error states.

## Suggested Improvements

- Connect product cards to `GET /api/products`.
- Add search filtering by product name and description.
- Apply the price range slider to the visible product list.
- Add cart state and wire the `Add` button.
- Add wishlist state and wire the save button.
- Replace placeholder images with product image URLs from the database.
- Add empty state messaging when filters return no results.
