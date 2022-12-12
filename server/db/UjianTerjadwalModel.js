const { db } = require("./conn");
const { ObjectId } = require("mongodb");

const COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME;

class UjianTerjadwalModel {

    async findAll() {
        let data = await db().collection(COLLECTION_NAME).find().toArray();
        return data;
    }

    async findOneById(id) {
        let data = await db().collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) });
        return data;
    }

    async addNew(obj, callback) {
        let data = await db().collection(COLLECTION_NAME).insertOne(obj, callback);
        return data;
    }

    async edit(id, updatedObj, callback) {
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

    async deleteOneById(id, callback) {
        let query = { _id: ObjectId(id) };
        let data = await db().collection(COLLECTION_NAME).remove(query);
        return data;
    }
}

module.exports = new UjianTerjadwalModel();