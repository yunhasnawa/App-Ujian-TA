// Untuk koneksi ke MongoDB
const dbo = require("./conn");
// Konversi string ke ObjectId di MongoDB
const {ObjectId} = require("mongodb");

// Class Model yang bertugas memanipulasi data pada database sesuai dengan permintaan dari middleware
class UjianTerjadwalModel {

    constructor() {
        this.collectionName = "ujian_terjadwal";
    }

    getDb() {
        return dbo.getDb("ujian_ta");
    }

    findAll() {
        // MongoDB Database Object
        let db = this.getDb();
        // Query
        // .. lengkapi logika kode dengan query yang sesuai di sini ..
    }

    findOneById(id, callback) {
        // MongoDB Database Object
        let db = this.getDb();
        // Query
        // .. lengkapi logika kode dengan query yang sesuai di sini ..
    }

    addNew(obj, callback) {
        // MongoDB Database Object
        let db = this.getDb();
        // Query
        // .. lengkapi logika kode dengan query yang sesuai di sini ..
    }

    edit(id, updatedObj, callback) {
        // MongoDB Database Object
        let db = this.getDb();
        // Query
        // .. lengkapi logika kode dengan query yang sesuai di sini ..
    }

    deleteOneById(id, callback) {
        // MongoDB Database Object
        let db = this.getDb();
        // Query
        // .. lengkapi logika kode dengan query yang sesuai di sini ..
    }
}

module.exports = new UjianTerjadwalModel();