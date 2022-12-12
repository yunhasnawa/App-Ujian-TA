const express = require("express");
const Util = require("../lib/Util");

const recordRoutes = express.Router();

const model = require("../db/UjianTerjadwalModel");

recordRoutes.route("/record").get(async (req, res) => {
    let data = await model.findAll();
    res.json(data);
});

recordRoutes.route("/record/:id").get(async (req, res) => {
    let data = await model.findOneById(req.params.id);
    res.json(data);
});

recordRoutes.route("/record/add").post(async (req, res) => {
    let obj = Util.reqToObj(req);
    let data = await model.addNew(obj);
    res.json(data);
});

recordRoutes.route("/update/:id").put(async (req, res) => {
    let updatedObj = Util.reqToObj(req);
    let data = await model.edit(req.params.id, updatedObj);
    res.json(data);
});

recordRoutes.route("/delete/:id").delete(async (req, res) => {
    let data = await model.deleteOneById(req.params.id)
    res.json(data);
});

module.exports = recordRoutes;