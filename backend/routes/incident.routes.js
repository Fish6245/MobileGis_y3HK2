const express = require("express");
const router = express.Router();

const controller = require("../controllers/incident.controller");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/nearby", controller.getNearby);

module.exports = router;
