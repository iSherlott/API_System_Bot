const express = require("express");
const router = express.Router();

const users_controller = require("../controllers/users_controller");

router.get("/search", users_controller.find);
router.get("/:id", users_controller.findOne);
router.get("/", users_controller.findAll);
router.post("/", users_controller.insert);
router.put("/:id", users_controller.update);
router.delete("/:id", users_controller.delete);

module.exports = router;
