const express = require("express");
const router = express.Router();

const card_controller = require("../controllers/card_controller");

router.get("/", card_controller.findAll);
router.get("/find", card_controller.find);
router.get("/:id", card_controller.findOne);
router.post("/", card_controller.insert);
router.put("/:id", card_controller.update);
router.delete("/:id", card_controller.delete);

module.exports = router;
