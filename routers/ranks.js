const express = require("express");
const router = express.Router();

const ranks_controller = require("../controllers/ranks_controller");

router.get("/", ranks_controller.findAll);
router.get("/find", ranks_controller.find);
router.get("/:id", ranks_controller.findOne);
router.put("/:id", ranks_controller.update);

module.exports = router;
