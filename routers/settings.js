const express = require("express");
const router = express.Router();

const settings_controller = require("../controllers/settings_controller");

router.get("/search", settings_controller.find);
router.get("/:id", settings_controller.findOne);
router.get("/", settings_controller.findAll);
router.post("/", settings_controller.insert);
router.put("/:id", settings_controller.update);
router.delete("/:id", settings_controller.delete);

module.exports = router;
