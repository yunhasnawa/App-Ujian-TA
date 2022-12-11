const express = require("express");
const Util = require("../lib/Util");

// recordRoutes adalah hasil instansiasi dari express router.
// Digunakan untuk mendefinisikan router dari aplikasi server ini.
// Router ini akan dijalankan sebagai middleware dan akan menghandle semua request yang datang dari path URL /record.
const recordRoutes = express.Router();

// Class model untuk manipulasi data collection Ujian Terjadwal.
const model = require("../db/UjianTerjadwalModel");

// Ambil semua data.
recordRoutes.route("/record").get(function (req, res) {
    console.log("/record")
    model.findAll().toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// Ambil data berdasarkan object ID tertentu.
recordRoutes.route("/record/:id").get(function (req, res) {
    console.log("/record/:id")
    model.findOneById(req.params.id, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// Menambahkan data baru.
recordRoutes.route("/record/add").post(function (req, response) {
    console.log("/record/add")
    let obj = Util.reqToObj(req);
    model.addNew(obj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// Mengubah data tertentu berdasarkan Object ID.
recordRoutes.route("/update/:id").post(function (req, response) {
    console.log("/update/:id")
    let updatedObj = Util.reqToObj(req);
    model.edit(updatedObj._id, updatedObj, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
    });
});

// Menghapus data tertentu berdasarkan object Id
recordRoutes.route("/:id").delete((req, response) => {
    console.log("/:id")
    model.deleteOneById(req.params.id,  function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;