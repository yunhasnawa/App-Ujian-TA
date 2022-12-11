const express = require("express");
const Util = require("../lib/Util");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
    console.log("/record")
    let db_connect = dbo.getDb("ujian_ta");
    db_connect
        .collection("ujian_terjadwal")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
    console.log("/record/:id")
    let db_connect = dbo.getDb("ujian_ta");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("ujian_terjadwal")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
    console.log("/record/add")
    let db_connect = dbo.getDb();
    // let myobj = {
    //     name: req.body.name,
    //     position: req.body.position,
    //     level: req.body.level,
    // };
    myobj = Util.reqToObj(req);
    console.log(myobj)
    db_connect.collection("ujian_terjadwal").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
    console.log("/update/:id")
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            nomor_ujian: req.body.nomor_ujian,
            kode_prodi: req.body.kode_prodi,
            id_event: req.body.id_event,
            jenis_ujian: req.body.jenis_ujian,
            periode_proposal: req.body.periode_proposal,
            tahap: req.body.tahap,
            id_proposal: req.body.id_proposal,
            judul_proposal: req.body.judul_proposal,
            nim_pengusul: req.body.nim_pengusul,
            nama_pengusul: req.body.nama_pengusul,
            nim_anggota: req.body.nim_anggota,
            nama_anggota: req.body.nama_anggota,
            id_dosen_moderator: req.body.id_dosen_moderator,
            nama_dosen_moderator: req.body.nama_dosen_moderator,
            id_dosen_penguji_1: req.body.id_dosen_penguji_1,
            nama_dosen_penguji_1: req.body.nama_dosen_penguji_1,
            id_dosen_penguji_2: req.body.id_dosen_penguji_2,
            nama_dosen_penguji_2: req.body.nama_dosen_penguji_2,
            id_sesi: req.body.id_sesi,
            waktu_mulai: req.body.waktu_mulai,
            waktu_selesai: req.body.waktu_selesai,
            tanggal: req.body.tanggal,
            id_ruang: req.body.id_ruang,
            kode_ruang: req.body.kode_ruang,
            nama_ruang: req.body.nama_ruang,
            keterangan_ruang: req.body.keterangan_ruang
        },
    };
    db_connect
        .collection("ujian_terjadwal")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
    console.log("/:id")
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("ujian_terjadwal").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;