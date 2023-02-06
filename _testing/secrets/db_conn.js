const mongodb = require("mongodb")

exports.listDatabases = async function (client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

exports.createItem = async function (client, db, collection, newItem) {
    const result = await client.db(db).collection(collection).insertOne(newItem);
    console.log(`New item created with the following id: ${result.insertedId}`);
    return result;
};

exports.findItemsByCreds = async function (client, db, collection, creds = {}) {
    const result = await client.db(db).collection(collection).find(creds).toArray();
    return result;
};

exports.deleteItemByID = async function (client, db, collection, id) {
    const result = await client.db(db).collection(collection).deleteOne({ _id: new mongodb.ObjectID(id) });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return result;
}