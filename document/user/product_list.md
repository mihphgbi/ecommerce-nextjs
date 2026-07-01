# Product List

## Status
In progress

Main files:

- `src/app/products/page.tsx`
- `src/app/products/style.scss`
- `src/app/api/products/route.ts`
- `src/app/api/product-types/route.ts`
- `src/model/product/product.ts`
- `src/app/components/navigations/nav-bar.tsx`
- `src/app/components/navigations/desktop-nav-bar.tsx`
- `src/app/components/navigations/mobile-nav-bar.tsx`
- `src/app/components/footer/footer.tsx`
- `src/assets/pre-product-img.png`

## Overview

The product list page is the user-facing product browsing page at `/products`.

It is implemented as a client component that fetches paginated product records from `GET /api/products`. Product type options are loaded from `GET /api/product-types`, allowing users to choose the kind of product they want to browse.

The page includes:

- Shared navigation header with desktop and mobile variants.
- Product overview hero.
- Search input.
- Product type selector.
- Sort selector.
- Sidebar product type buttons.
- Price range slider.
- Product card grid.
- Pagination.
- Shared footer.

## Product Data

Products are loaded from `GET /api/products`.

Each product item may include:

- `id`
- `name`
- `description`
- `image`
- `quality`
- `sold_items`
- `price`
- `is_sale`
- `sale_price`
- `saler_id`
- `saler`
- `product_type_id`
- `product_type`

Product types are loaded from `GET /api/product-types`.

Each product type includes:

- `id`
- `name`

## Flow

Default browsing flow:

1. User opens `/products`.
2. `NavBar` renders the shared storefront navigation.
3. The product overview hero introduces the collection.
4. The page requests `GET /api/products?page=1&limit=8`.
5. The page requests `GET /api/product-types`.
6. The toolbar renders search, product type, and sort controls.
7. The sidebar renders product type buttons and a price range slider.
8. The product grid renders cards from the API response.
9. `Footer` renders below the product list.

Product type filter flow:

1. User chooses a product type from the top select or sidebar button list.
2. `selectedProductTypeId` updates in local React state.
3. The current page resets to `1`.
4. The page requests `GET /api/products?page=1&limit=8&product_type_id={selectedProductTypeId}`.
5. The product grid displays products that match the selected type.

All product types flow:

1. User clears the product type select or chooses `All types` in the sidebar.
2. `selectedProductTypeId` becomes empty.
3. The page requests `GET /api/products?page=1&limit=8` without a type query parameter.
4. The product grid displays all products.

Sort flow:

1. User chooses a sort option.
2. `sortBy` updates in local React state.
3. Products from the current API page are sorted in the browser.
4. Supported sort options are featured, price low to high, and price high to low.

Product detail navigation flow:

1. User clicks a product card image or product name.
2. The page routes to `/products/{product.id}`.
3. The dynamic product detail page renders from `src/app/products/[productId]/page.tsx`.

## User States

### Not Logged In

The product list page is publicly browsable.

Expected available actions:

- View product cards.
- Filter by product type.
- Clear product type filtering to show all products.
- Change sort order.
- Adjust the price range slider.
- Open product item detail pages.
- Use the shared navigation sign-in and sign-up controls.

### Logged In

The product list page currently behaves the same for logged-in users, with account controls in the shared navigation.

Expected available actions:

- View and filter product cards.
- Open product item detail pages.
- Use account controls from the shared navigation.
- Sign out from the shared navigation.

### Agent User

Agent status is not used directly on the product list page.

Agent users can still browse the product list as normal users. Agent-only management features live under `/agent-management`, and the shared nav exposes an Agent Management link for agent users.

## Current UI Behavior

- Products are loaded from `GET /api/products`.
- Product type options are loaded from `GET /api/product-types`.
- Product requests use `page` and `limit` query parameters.
- When no product type is selected, all products are shown.
- Selecting a product type filters products by `product_type_id`.
- The current page resets when the selected product type changes.
- The result count describes whether all types or a selected type is being shown.
- Empty results display an empty state message.
- Search input is visible but does not currently filter products.
- Price range slider is visible but does not currently filter products.
- Product cards use the placeholder image `src/assets/pre-product-img.png`.
- `Add` and save buttons are visible on product cards but do not currently perform cart or wishlist actions.
- Sale products display a sale price and deleted original price.

## API

Product list endpoints:

- `GET /api/products`
- `GET /api/products?page={page}&limit={limit}`
- `GET /api/products?product_type_id={productTypeId}`
- `GET /api/products?type_id={productTypeId}`
- `GET /api/products?is_sale=true`
- `GET /api/products?is_sale=false`
- `GET /api/products?sort_by=sold_items`
- `GET /api/product-types`

Agent management endpoints:

- `GET /api/products?agent_only=true`
- `POST /api/products`
- `PUT /api/products?id={id}`
- `DELETE /api/products?id={id}`
- `POST /api/product-types`

`GET /api/products` validates `product_type_id` as a MongoDB ObjectId when the filter is provided. When no product type query parameter is provided, the API returns all products.

The API response includes a `pagination` object with:

- `page`
- `limit`
- `total`
- `totalPages`
- `hasNextPage`
- `hasPreviousPage`

Agent-only product list requests require a signed-in agent session and return only products where `saler_id` matches the current user.

## Current Gaps

- Search input does not filter products.
- Price range slider does not filter products.
- Add-to-cart action is not implemented.
- Wishlist/save action is not implemented.
- Product cards use placeholder imagery.
- Product detail page still uses static sample content.
