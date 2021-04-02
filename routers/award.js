const express = require("express");
const router = express.Router();

const award_controller = require("../controllers/award_controller");

router.get("/", award_controller.findAll);
router.get("/find", award_controller.find);
router.get("/:id", award_controller.findOne);
router.post("/", award_controller.insert);
router.put("/:id", award_controller.update);
router.delete("/:id", award_controller.delete);

module.exports = router;
