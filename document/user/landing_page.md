# Landing Page

## Status
Improving

Main files:

- `src/app/(home)/page.tsx`
- `src/app/(home)/layout.tsx`
- `src/app/(home)/style.scss`
- `src/app/components/navigations/nav-bar.tsx`
- `src/app/components/navigations/desktop-nav-bar.tsx`
- `src/app/components/navigations/mobile-nav-bar.tsx`
- `src/app/components/navigations/top-bar.tsx`
- `src/app/components/footer/footer.tsx`
- `src/providers/session-expiration-guard.tsx`

Current implementation status:

- The page is a client component because it reads the NextAuth session with `useSession`.
- The layout wraps the page with the global home navigation, top bar, toast alert, and footer.
- Most landing page content is static and defined directly inside `page.tsx`.
- Product cards on the landing page use local arrays and the placeholder image `src/assets/pre-product-img.png`.
- The page does not currently fetch live product data from `/api/products`.
- The primary unauthenticated call to action links to `/sign-in`.
- The top notification bar can be dismissed and stores that state in `localStorage` with the key `topbar-dismissed`.
- The shared navigation includes desktop and mobile variants.
- `SessionExpirationGuard` signs users out when the NextAuth session expires.

Landing page sections currently shown:

- Hero panel: cosmetic arrivals headline, supporting copy, and unauthenticated `Shop now` button.
- Incentives: delivery, warranty, returns, and loyalty discount messages.
- Shop by Collection: three static collection cards.
- Similar Product: four static product cards.
- Promo section: final stock and sale CTA with static images.

## Flow

Default storefront flow:

1. User opens `/`.
2. `src/app/(home)/layout.tsx` renders `NavBar`, optional `ToastAlert`, page content, and `Footer`.
3. `NavBar` renders `TopBar`, `DesktopNavBar`, and `MobileNavBar`.
4. `MobileNavBar` opens the shared navigation items inside an Ant Design drawer on smaller screens.
5. `DesktopNavBar` and `MobileNavBar` check `useSession()` to decide whether to show auth buttons or account controls.
6. `src/app/(home)/page.tsx` renders the landing page content and checks `useSession()` to decide whether to show the hero `Shop now` button.

Unauthenticated sign-in flow from the landing page:

1. User clicks `Shop now` in the hero or promo section.
2. User is sent to `/sign-in`.
3. `src/app/(auth)/sign-in/page.tsx` renders `SignInForm`.
4. Submitting the form dispatches `login` from `src/lib/redux/action/auth.ts`.
5. `login` calls NextAuth `signIn('credentials', { redirect: false })`.
6. On success, the user is redirected back to `/`.
7. The home layout can show a success toast through the Redux layout slice.

Unauthenticated sign-in flow from the nav dialog:

1. User clicks `Sign in` in the desktop nav or mobile drawer.
2. `src/app/(home)/dialog/sign-in.tsx` opens an Ant Design modal.
3. The modal renders the shared `SignInForm`.
4. Submitting the form dispatches the same `login` thunk.
5. On success, the modal closes and the user is routed to `/`.

Unauthenticated sign-up flow from the nav dialog:

1. User clicks `Sign up` in the desktop nav or mobile drawer.
2. `src/app/(home)/dialog/sign-up.tsx` opens an Ant Design modal.
3. The modal renders the shared `SignUpForm`.
4. Submitting the form dispatches `createUser` from `src/lib/redux/action/users.ts`.
5. `createUser` posts the new account payload to `/api/user`.

Separate sign-up page flow:

1. User opens `/sign-up`.
2. `src/app/(auth)/sign-up/page.tsx` renders `SignUpForm`.
3. Submitting the form dispatches `createUser`.
4. The page observes `state.auth.isLogin`, but account creation does not currently set that flag directly.

## User States

### Not Logged In

When there is no `session.user`:

- The desktop nav and mobile drawer show `Sign in` and `Sign up`.
- `Sign in` opens a modal on the landing page.
- `Sign up` opens a modal on the landing page.
- The hero section shows a `Shop now` button linking to `/sign-in`.
- The promo section also shows a `Shop now` button linking to `/sign-in`.
- The user can browse the landing page content without authentication.

Expected available actions:

- Read hero, incentive, collection, product preview, and promo content.
- Dismiss the top update bar.
- Open sign-in and sign-up forms from the nav.
- Navigate to `/sign-in` from landing page CTAs.
- Create an account through `/api/user`.

### Logged In

When a NextAuth session exists:

- The desktop nav shows a user icon dropdown.
- The desktop nav shows `Sign out`.
- The mobile drawer shows `Information` and `Sign out`.
- The nav no longer shows `Sign in` or `Sign up`.
- The hero `Shop now` button is hidden because `page.tsx` only renders it when `!session?.user`.
- The promo section still shows `Shop now` and links to `/sign-in`; this is a current behavior gap.
- The account information link points to `/user-management/me`, which redirects to `/user-management/useId={actualUserId}` after the server resolves the signed-in user.
- `Sign out` calls NextAuth `signOut()`.

Expected available actions:

- Browse landing page content.
- Open account dropdown or mobile drawer.
- Navigate to the user information route.
- Sign out.

### Agent User

Agent status is not directly used by the landing page, but it exists in the session as `session.user.isAgent`.

- The agent flag is loaded during credentials login from `User.is_agent`.
- Agent users can access `/agent-management`.
- The desktop account dropdown and mobile drawer show an `Agent Management` link for agent users.

## API

The landing page itself does not call an API for content. Related user and auth flows use these APIs and services.

### `POST /api/user`

File: `src/app/api/user/route.ts`

Used by:

- `src/lib/redux/action/users.ts`
- `src/app/(home)/dialog/sign-up.tsx`
- `src/app/(auth)/sign-up/page.tsx`

Purpose:

- Creates a user account.
- Validates the password with `PASSWORD_REGEX`.
- Hashes the password with `bcrypt`.
- Stores the user through Prisma.

Request payload comes from `SignUpForm`:

- `username`
- `password`
- `rePassword`
- `fullName`
- `email`
- `phone`
- `address`
- `isSeller`

Saved user fields:

- `email`
- `username`
- `password`
- `phone`
- `address`
- `is_agent`
- `is_authenticate`
- `full_name`

Response:

- Success: `{ status: "ok" }` with HTTP `202`.
- Failure: `{ error }` with HTTP `401`.

### `GET /api/user?name={username}`

File: `src/app/api/user/route.ts`

Used by:

- `src/lib/auth.ts` inside the credentials provider.

Purpose:

- Looks up a user by username during credentials login.
- Returns `{ data: user }`.
- The credentials provider compares the submitted password with the stored hashed password.

### NextAuth Credentials Login

Files:

- `src/lib/auth.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/lib/redux/action/auth.ts`

Client action:

- `login` calls `signIn('credentials', { username, password, redirect: false })`.

Session fields mapped from the user record:

- `id`
- `username`
- `email`
- `isAgent`

Auth behavior:

- On login success, Redux opens a success toast and the UI routes to `/`.
- On login failure, Redux opens an error toast.
- NextAuth uses JWT sessions with a two-day max age.
- `SessionExpirationGuard` signs out expired sessions and sends users to `/sign-in`.

### Product APIs

The landing page currently does not use product APIs.

Existing product API:

- `GET /api/products`
- `GET /api/products?page={page}&limit={limit}`
- `GET /api/products?product_type_id={productTypeId}`
- `GET /api/products?is_sale=true`
- `GET /api/products?sort_by=sold_items`
- `POST /api/products`
- `PUT /api/products?id={id}`
- `DELETE /api/products?id={id}`

These are used by the product list and agent dashboard product management flow, not by the landing page. If the landing page is later connected to live products, `GET /api/products` is the likely source for the product preview and similar product sections.

## Related Components

Navigation:

- `NavBar` composes the top notification bar, desktop navigation, and mobile navigation.
- `DesktopNavBar` controls auth-aware desktop nav rendering.
- `MobileNavBar` renders the same navigation items in a drawer and shows auth or account actions for mobile.
- `TopBar` stores dismissed state in `localStorage`.

Forms:

- `SignInForm` contains username, password, remember-me, and submit controls.
- `SignUpForm` contains username, password, repeated password, full name, email, phone, and submit controls.

State:

- `authSlice` stores `isLogin` and login error state.
- `layoutSlice` stores toast visibility, status, and message.
- `ClientProvider` wraps the app with NextAuth `SessionProvider`, Redux `StoreProvider`, and session expiration behavior.

## Current Gaps

- Landing page product data is static instead of API-driven.
- Static product cards do not link to product detail pages.
- Logged-in users still see the promo section `Shop now` link to `/sign-in`.
- Product, docs, about, and pricing menu items are partly placeholders; only product overview links to `/products`.
- Sign-up does not currently log the user in after account creation.
- `rePassword` is collected by the form but is not compared in the API route.

## Suggested Improvements

- Connect the product preview sections to `GET /api/products`.
- Hide or change the promo `Shop now` CTA for logged-in users.
- Link product cards to `/products/[productId]` when live products are available.
- Replace placeholder nav links with real routes or remove them until pages exist.
- Validate sign-up payloads with Zod and compare `password` with `rePassword`.
