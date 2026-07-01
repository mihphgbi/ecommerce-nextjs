// MongoDB change script for adding sold item counts to products.
// Run with mongosh against the database from DATABASE_URL.

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

db.products.find({sold_items: {$exists: false}}).forEach((product) => {
    db.products.updateOne(
        {_id: product._id},
        {$set: {sold_items: Math.floor(Math.random() * 101)}}
    );
});
