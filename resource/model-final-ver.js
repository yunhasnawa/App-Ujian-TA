// // Untuk koneksi ke MongoDB
// const dbo = require("./conn");
// // Konversi string ke ObjectId di MongoDB
// const {ObjectId} = require("mongodb");
//
// // Class Model yang bertugas memanipulasi data pada database sesuai dengan permintaan dari middleware
// class UjianTerjadwalModel {
//
//     constructor() {
//         this.collectionName = "ujian_terjadwal";
//     }
//
//     getDb() {
//         return dbo.getDb("ujian_ta");
//     }
//
//     findAll() {
//         // MongoDB Database Object
//         let db = this.getDb();
//         // Query
//         return db.collection(this.collectionName).find({});
//     }
//
//     findOneById(id, callback) {
//         // MongoDB Database Object
//         let db = this.getDb();
//         // Query
//         let query = { _id: ObjectId(id) };
//         db.collection(this.collectionName).findOne(query, callback);
//     }
//
//     addNew(obj, callback) {
//         // MongoDB Database Object
//         let db = this.getDb();
//         // Query
//         db.collection(this.collectionName).insertOne(obj, callback);
//     }
//
//     edit(id, updatedObj, callback) {
//         // MongoDB Database Object
//         let db = this.getDb();
//         // Query
//         let query = { _id: ObjectId(id) };
//         // SET
//         let newValues = {
//             $set: {
//                 nomor_ujian: updatedObj.nomor_ujian,
//                 kode_prodi: updatedObj.kode_prodi,
//                 id_event: updatedObj.id_event,
//                 jenis_ujian: updatedObj.jenis_ujian,
//                 periode_proposal: updatedObj.periode_proposal,
//                 tahap: updatedObj.tahap,
//                 id_proposal: updatedObj.id_proposal,
//                 judul_proposal: updatedObj.judul_proposal,
//                 nim_pengusul: updatedObj.nim_pengusul,
//                 nama_pengusul: updatedObj.nama_pengusul,
//                 nim_anggota: updatedObj.nim_anggota,
//                 nama_anggota: updatedObj.nama_anggota,
//                 id_dosen_moderator: updatedObj.id_dosen_moderator,
//                 nama_dosen_moderator: updatedObj.nama_dosen_moderator,
//                 id_dosen_penguji_1: updatedObj.id_dosen_penguji_1,
//                 nama_dosen_penguji_1: updatedObj.nama_dosen_penguji_1,
//                 id_dosen_penguji_2: updatedObj.id_dosen_penguji_2,
//                 nama_dosen_penguji_2: updatedObj.nama_dosen_penguji_2,
//                 id_sesi: updatedObj.id_sesi,
//                 waktu_mulai: updatedObj.waktu_mulai,
//                 waktu_selesai: updatedObj.waktu_selesai,
//                 tanggal: updatedObj.tanggal,
//                 id_ruang: updatedObj.id_ruang,
//                 kode_ruang: updatedObj.kode_ruang,
//                 nama_ruang: updatedObj.nama_ruang,
//                 keterangan_ruang: updatedObj.keterangan_ruang
//             },
//         };
//         db.collection(this.collectionName).updateOne(query, newValues, callback);
//     }
//
//     deleteOneById(id, callback) {
//         // MongoDB Database Object
//         let db = this.getDb();
//         // Query
//         let query = { _id: ObjectId(id) };
//         db.collection(this.collectionName).deleteOne(query, callback);
//     }
// }
//
// module.exports = new UjianTerjadwalModel();