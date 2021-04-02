const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const users = require("./routers/users");
const settings = require("./routers/settings");
const price = require("./routers/price");
const ranks = require("./routers/ranks");
const award = require("./routers/award");
const card = require("./routers/card");
const user_card = require("./routers/user_card");
const path = require("path");
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", users);
app.use("/price", price);
app.use("/settings", settings);
app.use("/ranks", ranks);
app.use("/award", award);
app.use("/card", card);
app.use("/usercard", user_card);

app.listen(PORT, () => console.log("API Start!"));
