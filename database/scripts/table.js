// MongoDB setup script for this Prisma-backed app.
// Run with mongosh against the database from DATABASE_URL.

const ensureCollection = (name, options) => {
    if (!db.getCollectionNames().includes(name)) {
        db.createCollection(name, options);
        return;
    }

    if (options.validator) {
        db.runCommand({
            collMod: name,
            validator: options.validator,
            validationLevel: options.validationLevel || "moderate",
        });
    }
};

ensureCollection("product_types", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {
                name: {
                    bsonType: "string",
                },
                createdAt: {
                    bsonType: "date",
                },
                updatedAt: {
                    bsonType: "date",
                },
            },
        },
    },
    validationLevel: "moderate",
});

db.product_types.createIndex(
    {name: 1},
    {unique: true, name: "product_types_name_idx"}
);

ensureCollection("products", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "price", "quality", "saler_id"],
            properties: {
                name: {
                    bsonType: "string",
                },
                description: {
                    bsonType: ["string", "null"],
                },
                image: {
                    bsonType: ["string", "null"],
                },
                is_sale: {
                    bsonType: "bool",
                },
                price: {
                    bsonType: ["double", "int", "long", "decimal"],
                },
                quality: {
                    bsonType: ["int", "long"],
                },
                sold_items: {
                    bsonType: ["int", "long"],
                },
                sale_price: {
                    bsonType: ["double", "int", "long", "decimal", "null"],
                },
                saler_id: {
                    bsonType: "objectId",
                },
                product_type_id: {
                    bsonType: ["objectId", "null"],
                },
                createdAt: {
                    bsonType: "date",
                },
                updatedAt: {
                    bsonType: "date",
                },
            },
        },
    },
    validationLevel: "moderate",
});

db.products.createIndex(
    {name: 1},
    {name: "products_name_idx"}
);

db.products.createIndex(
    {product_type_id: 1},
    {name: "products_product_type_id_idx"}
);

db.products.createIndex(
    {saler_id: 1},
    {name: "products_saler_id_idx"}
);

ensureCollection("user", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password", "email"],
            properties: {
                username: {
                    bsonType: "string",
                },
                password: {
                    bsonType: "string",
                },
                is_agent: {
                    bsonType: "bool",
                },
                email: {
                    bsonType: "string",
                },
                address: {
                    bsonType: ["string", "null"],
                },
                is_authenticate: {
                    bsonType: "bool",
                },
                full_name: {
                    bsonType: ["string", "null"],
                },
                phone: {
                    bsonType: ["string", "null"],
                },
                createdAt: {
                    bsonType: "date",
                },
                updatedAt: {
                    bsonType: "date",
                },
            },
        },
    },
    validationLevel: "moderate",
});

db.user.createIndex(
    {username: 1},
    {unique: true, name: "user_username_idx"}
);

db.user.createIndex(
    {email: 1},
    {unique: true, name: "user_email_idx"}
);
