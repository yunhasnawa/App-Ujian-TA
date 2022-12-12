const { db } = require("./conn");
const { ObjectId } = require("mongodb");

const COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME;

const findAll = async () => {
    let data = await db().collection(COLLECTION_NAME).find().toArray();
    return data;
}

const findOneById = async (id) => {
    let data = await db().collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) });
    return data;
}

const addNew = async (obj) => {
    let data = await db().collection(COLLECTION_NAME).insertOne(obj);
    return data;
}

const edit = async (id, updatedObj) => {
    let query = { _id: ObjectId(id) };

    let newValues = {
        $set: {}
    };

    for (const [key, value] of Object.entries(updatedObj)) {
        newValues['$set'][key] = value;
    };

    let data = await db().collection(COLLECTION_NAME).updateOne(query, newValues);

    return data;
}

const deleteOneById = async (id) => {
    let query = { _id: ObjectId(id) };
    let data = await db().collection(COLLECTION_NAME).remove(query);
    return data;
}

module.exports = {
    findAll,
    findOneById,
    addNew,
    edit,
    deleteOneById
};