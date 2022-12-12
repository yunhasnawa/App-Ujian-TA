const express = require("express");
const Util = require("../lib/Util");

const recordRoutes = express.Router();

const { findAll, findOneById, addNew, deleteOneById, edit } = require("../db/UjianTerjadwalModel");

recordRoutes.route("/record").get(async (req, res) => {
    let data = await findAll();
    res.json(data);
});

recordRoutes.route("/record/:id").get(async (req, res) => {
    let data = await findOneById(req.params.id);
    res.json(data);
});

recordRoutes.route("/record/add").post(async (req, res) => {
    let obj = Util.reqToObj(req);
    let data = await addNew(obj);
    res.json(data);
});

recordRoutes.route("/update/:id").put(async (req, res) => {
    let updatedObj = Util.reqToObj(req);
    let data = await edit(req.params.id, updatedObj);
    res.json(data);
});

recordRoutes.route("/delete/:id").delete(async (req, res) => {
    let data = await deleteOneById(req.params.id)
    res.json(data);
});

module.exports = recordRoutes;