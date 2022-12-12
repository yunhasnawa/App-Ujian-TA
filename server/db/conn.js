const { MongoClient } = require("mongodb");

const CONNECTION = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME;
const COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME;

const client = new MongoClient(CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin"
});

var _db;

module.exports = {
    connectToServer: async (callback) => {
        try {
            _db = client.db('ujian_terjadwal')
            let isCollectionExist = await _db.collections();
            if (isCollectionExist.length == 0 || isCollectionExist.includes(COLLECTION_NAME)) {
                await _db.createCollection(COLLECTION_NAME)
            }
        } catch (error) {
            console.error(error);
            process.exit(1)
        }
    },
    db: () => _db,
};