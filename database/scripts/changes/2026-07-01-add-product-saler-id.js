// MongoDB change script for adding product saler ownership.
// Run with mongosh against the database from DATABASE_URL.

const agent = db.user.findOne({is_agent: true});

if (!agent) {
    throw new Error("Cannot backfill products: no agent user found with is_agent = true.");
}

db.products.updateMany(
    {
        $or: [
            {saler_id: {$exists: false}},
            {saler_id: null},
        ],
    },
    {
        $set: {
            saler_id: agent._id,
        },
    }
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
    {saler_id: 1},
    {name: "products_saler_id_idx"}
);
