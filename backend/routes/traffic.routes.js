const express = require("express");
const router = express.Router();

const trafficController = require("../controllers/traffic.controller");

router.get("/", trafficController.getTraffic);

module.exports = router;
