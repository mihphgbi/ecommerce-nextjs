# Repository Guidelines For Coding Agents

This file is for AI coding agents working in `D:\source-code\ecommerce-nextjs`. Use it to understand the app layout, pick the right commands, and avoid project-specific mistakes.

## Working Rules
- This is a single Next.js ecommerce application, not a monorepo.
- Read `package.json`, `next.config.mjs`, `tsconfig.json`, and any touched route/component files before editing.
- Keep changes scoped to the requested feature or bug. Avoid unrelated cleanup, formatting churn, and broad rewrites.
- Use npm because the repo has `package-lock.json`. Do not introduce `pnpm-lock.yaml` or `yarn.lock`.
- Do not edit generated or dependency output such as `.next/`, `node_modules/`, `next-env.d.ts`, or `*.tsbuildinfo`.
- Never commit secrets. `.env` is ignored and may exist locally; read variable names only when possible and do not print secret values in handoffs.

## Project Structure
- `src/app/` contains the Next.js App Router pages, layouts, route groups, and API routes.
- `src/app/(auth)/` contains sign-in and sign-up pages.
- `src/app/(home)/` contains the storefront home route and home dialogs.
- `src/app/products/[productId]/` contains product detail pages.
- `src/app/agent-management/` contains seller/admin product management UI.
- `src/app/user/` and `src/app/user-management/[userId]/` contain user-facing and user management routes.
- `src/app/api/` contains route handlers for auth, products, and users.
- `src/app/components/` contains app-local UI components such as navigation, forms, footer, sidebar, toast, and checkbox.
- `src/lib/` contains auth, Prisma, and Redux infrastructure.
- `src/lib/db/prisma.ts` exports the singleton Prisma client.
- `src/lib/redux/` contains Redux Toolkit actions, store setup, hooks, and slices.
- `src/model/` contains TypeScript model shapes for forms, products, and users.
- `src/regex/` contains validation regexes.
- `src/style/` and route-local `*.scss` files contain Sass styles.
- `src/assets/` contains imported static assets used by the app.
- `public/` contains public static files.
- `prisma/schema.prisma` defines the MongoDB Prisma schema.

## Build, Test, And Development Commands
Run commands from the repository root unless noted.

- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Build production app: `npm run build`
- Start built app: `npm run start`
- Lint: `npm run lint`
- Regenerate Prisma client after schema changes: `npx prisma generate`
- Open Prisma Studio for local inspection: `npx prisma studio`

There is currently no test script in `package.json`. For behavioral changes, run the narrowest useful validation available, usually `npm run lint` and/or `npm run build`.

## Runtime And Environment
- The app uses Next.js `14.1.4`, React `18`, TypeScript, Sass, Tailwind, Ant Design, Redux Toolkit, NextAuth, Prisma, and MongoDB.
- Prisma uses MongoDB through `DATABASE_URL` in `prisma/schema.prisma`.
- NextAuth is configured in `src/lib/auth.ts` and `src/app/api/auth/[...nextauth]/route.ts`.
- Auth-related env vars used by the code include:
  - `DATABASE_URL`
  - `NEXT_PUBLIC_APP_URL`
  - `NEXTAUTH_URL`
  - `PORT`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `NEXT_AUTH_SECRET`
- Keep `.env` local. Do not add secrets to tracked files or examples with real values.

## Coding Conventions
### TypeScript And React
- Follow the existing TypeScript style in touched files.
- The project uses the `@/*` alias for imports from `src/*`.
- Preserve App Router conventions: pages are `page.tsx`, layouts are `layout.tsx`, and API handlers are `route.ts`.
- Add `"use client"` only when a component actually needs client behavior such as hooks, Redux, NextAuth client session access, browser APIs, or event handlers.
- Keep server-side data access in route handlers, server components, or server utilities. Do not import Prisma into client components.
- Prefer typed data shapes from `src/model/` where they already exist.
- Keep UI changes consistent with the existing mix of Ant Design, Sass, and Tailwind instead of introducing a new UI framework.

### Styling
- Sass files are already used for route and component styles. Preserve nearby styling patterns.
- Tailwind is configured in `tailwind.config.js` and sorted by `prettier-plugin-tailwindcss`.
- Avoid broad restyling unless the task is explicitly visual or design-focused.

### State Management
- Redux Toolkit store setup lives in `src/lib/redux/store.ts`.
- Client providers are composed in `src/providers/client-provider.tsx` and `src/providers/provider-store.tsx`.
- Add new global state only when it is shared across routes/components. Prefer local component state for isolated UI behavior.

### API Routes
- API route handlers live under `src/app/api/**/route.ts`.
- Use `NextRequest` and `NextResponse` consistently with the existing handlers.
- Validate and normalize request input before passing it to Prisma.
- Return explicit status codes for errors and avoid leaking internal error objects to clients.

## Prisma And Database Guidance
- `prisma/schema.prisma` uses `provider = "mongodb"`.
- Models currently include `Product` mapped to `products` and `User` mapped to `user`.
- MongoDB Prisma models use `String @id @default(auto()) @map("_id") @db.ObjectId`.
- After changing Prisma models, run `npx prisma generate`.
- Prisma MongoDB does not use normal SQL migration files. Do not add SQL migrations for this project.
- Be careful changing mapped field names such as `is_sale`, `sale_price`, `is_agent`, and `is_authenticate`; UI/API code may depend on those exact names.

## Auth Guidance
- Credentials auth fetches `/api/user` from a resolved app URL in `src/lib/auth.ts`.
- Google auth requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- The code currently uses `NEXT_AUTH_SECRET` as the NextAuth secret name. Do not silently rename it to `NEXTAUTH_SECRET` without updating the app and deployment env together.
- Password hashing uses `bcrypt` in the user API and credentials provider.

## Validation Guidance
- For most code changes, run `npm run lint`.
- For route, server, Prisma, or build-sensitive changes, run `npm run build` when feasible.
- If `prisma/schema.prisma` changes, run `npx prisma generate`.
- If validation cannot be run because dependencies, env vars, or services are missing, state that explicitly in the final handoff.

## Git And Review Hygiene
- The worktree may already contain user changes. Do not revert or overwrite unrelated changes.
- Check `git status --short` before and after edits when making changes.
- Keep final summaries focused on files changed, validation run, and any follow-up risk.
- Do not create commits unless the user explicitly asks.
