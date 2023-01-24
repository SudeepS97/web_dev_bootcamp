const { MongoClient } = require('mongodb');

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createFruit(client, newFruit) {
    const result = await client.db("fruitsDB").collection("fruits").insertOne(newFruit);
    console.log(`New fruit review created with the following id: ${result.insertedId}`);
}

async function createFruits(client, newFruits) {
    const result = await client.db("fruitsDB").collection("fruits").insertMany(newFruits);
    console.log(`${result.insertedCount} new fruit review(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

async function upsertFruitsByName(client, nameOfFruit, updatedReview) {
    const result = await client.db("fruitsDB").collection("fruits")
        .updateOne({ name: nameOfFruit },
            { $set: updatedReview },
            { upsert: true });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

async function deleteFruitByName(client, nameOfFruit) {
    const result = await client.db("fruitsDB").collection("fruits")
        .deleteOne({ name: nameOfFruit });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function findOneFruitByName(client, nameOfFruit) {
    const result = await client.db("fruitsDB").collection("fruits").findOne({ name: nameOfFruit });

    if (result) {
        console.log(`Found a fruit review in the collection with the name '${nameOfFruit}':`);
        console.log(result);
    } else {
        console.log(`No fruit reviews found with the name '${nameOfFruit}'`);
    }
}

async function main() {
    const uri = "mongodb+srv://<username>:<password>@cluster0.3aijqiy.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await listDatabases(client);
        let apple = {
            name: "Apple",
            score: 6,
            review: "Pretty decent.",
        };

        await createFruit(client, apple);

        let orange = {
            name: "Orange",
            score: 4,
            review: "Too sour for me.",
        };
        let banana = {
            name: "Banana",
            score: 10,
            review: "The perfect fruit!",
        };

        await createFruits(client, [orange, banana]);
        await upsertFruitsByName(client, "Banana", { name: "Banana", score: 9, review: "ALMOST the perfect fruit." });
        await deleteFruitByName(client, "Orange");
        await findOneFruitByName(client, "Banana");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
