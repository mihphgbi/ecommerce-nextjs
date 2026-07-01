// MongoDB change script for adding product types.
// Run with mongosh against the database from DATABASE_URL.

if (!db.getCollectionNames().includes("product_types")) {
    db.createCollection("product_types", {
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
}

db.product_types.createIndex(
    {name: 1},
    {unique: true, name: "product_types_name_idx"}
);

db.runCommand({
    collMod: "products",
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
    {product_type_id: 1},
    {name: "products_product_type_id_idx"}
);

db.products.createIndex(
    {saler_id: 1},
    {name: "products_saler_id_idx"}
);
