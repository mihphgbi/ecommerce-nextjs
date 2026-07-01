# Database Change Scripts

This project uses Prisma with MongoDB, so this folder is for one-off JavaScript data-change scripts rather than SQL migrations.

Use dated filenames so changes stay ordered, for example:

- `2026-06-29-add-product-types.js`
- `2026-07-01-add-product-saler-id.js`
- `2026-07-01-add-product-sold-items.js`

Keep scripts idempotent where practical, document what data they change, and run `npx prisma generate` after Prisma schema changes.
