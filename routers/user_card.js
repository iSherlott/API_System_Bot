const express = require("express");
const router = express.Router();

const user_cards_controller = require("../controllers/user_cards_controller");

router.get("/search", user_cards_controller.find);
router.get("/:id", user_cards_controller.findOne);
router.get("/", user_cards_controller.findAll);
router.post("/", user_cards_controller.insert);
router.put("/:id", user_cards_controller.update);
router.delete("/:id", user_cards_controller.delete);

module.exports = router;
