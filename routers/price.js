const express = require("express");
const router = express.Router();

const price_controller = require("../controllers/price_controller");

router.get("/", price_controller.findAll);
router.get("/find", price_controller.find);
router.get("/:id", price_controller.findOne);
router.post("/", price_controller.insert);
router.put("/:id", price_controller.update);
router.delete("/:id", price_controller.delete);

module.exports = router;
