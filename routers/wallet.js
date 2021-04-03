const express = require("express");
const router = express.Router();

const coin_controller = require("../controllers/wallet_controller");

router.get("/", coin_controller.find);
router.post("/pay", coin_controller.pay);
router.post("/receive", coin_controller.receive);
router.get("/balance", coin_controller.balance);
router.post("/transfer", coin_controller.transfer);

module.exports = router;
