const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");

exports.find = async (req, res) => {
  try {
    let query;
    let limit = req.query.limit ? req.query.limit : 100;
    let order = req.query.order ? req.query.order.toUpperCase() : "DISABLE";

    if (
      typeof limit != "number" &&
      !(order == "ASC" || order == "DESC" || order == "DISABLE")
    )
      return res.status(400).json(`Body invalid`);

    if (order == "DISABLE") query = `SELECT id, coin FROM users LIMIT ${limit}`;
    else
      query = `SELECT id, coin FROM users ORDER BY coin ${order} LIMIT ${limit}`;

    await db.all(query, (error, rows) => {
      if (error) return res.status(502).json(`Bad gateway`);
      return res.status(200).json(rows);
    });
  } catch (error) {
    return res.status(500).json(`Find failed.`);
  }
};

exports.balance = async (req, res) => {
  try {
    await db.all(
      `SELECT id, coin FROM users WHERE id = (?)`,
      req.query.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Bad gateway`);
        if (rows.length == 0) return res.status(406).json(`User not found`);

        return res.status(200).json(rows[0]);
      }
    );
  } catch (error) {
    return res.status(500).json(`Balance failed.`);
  }
};

exports.pay = async (req, res) => {
  try {
    if (!req.body.id || !req.body.pay || typeof req.body.pay != "number")
      return res.status(400).json(`Body invalid`);

    await db.all(
      `SELECT id, coin FROM users WHERE id = (?)`,
      req.body.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Bad gateway`);
        if (rows.length == 0) return res.status(406).json(`User not found`);
        if (rows[0].coin - req.body.pay < 0)
          return res.status(406).json(`Insufficient funds`);

        let pay = db.prepare(
          `UPDATE users SET coin = coin - (?) WHERE id = (?)`,
          req.body.pay,
          req.body.id
        );
        pay.run();
        pay.finalize();
        res.status(201).json(`Pay successfully`);
      }
    );
  } catch (error) {
    return res.status(500).json(`Pay failed.`);
  }
};

exports.receive = async (req, res) => {
  try {
    if (
      !req.body.id ||
      !req.body.receive ||
      typeof req.body.receive != "number"
    )
      return res.status(400).json(`Body invalid`);

    await db.all(
      `SELECT id, coin FROM users WHERE id = (?)`,
      req.body.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Bad gateway`);
        if (rows.length == 1) return res.status(406).json(`User not found`);

        let receive = db.prepare(
          `UPDATE users SET coin = coin + (?) WHERE id = (?)`,
          req.body.receive,
          req.body.id
        );
        receive.run();
        receive.finalize();
        res.status(201).json(`Receive successfully`);
      }
    );
  } catch (error) {
    return res.status(500).json(`Receive failed.`);
  }
};

exports.transfer = async (req, res) => {
  try {
    if (
      !req.body.id_payer ||
      !req.body.id_receive ||
      !req.body.value ||
      typeof req.body.value != "number"
    )
      return res.status(400).json("Body invalid");

    await db.all(
      `SELECT id, coin FROM users WHERE id = (?) OR id = (?)`,
      req.body.id_payer,
      req.body.id_receive,
      (error, rows) => {
        if (!rows[0] || !rows[1]) return res.status(400).json(`User not found`);

        if (rows[0].id == req.body.id_payer) {
          if (rows[0].coin - req.body.value < 0)
            return res.status(406).json(`Insufficient funds`);
        } else if (rows[1].id == req.body.id_payer) {
          if (rows[1].coin - req.body.value < 0)
            return res.status(406).json(`Insufficient funds`);
        } else res.status(400).json(`User not found`);

        let pay = db.prepare(
          `UPDATE users SET coin = coin - (?) WHERE id = (?)`,
          req.body.value,
          req.body.id_payer
        );
        pay.run();
        pay.finalize();

        let receive = db.prepare(
          `UPDATE users SET coin = coin + (?) WHERE id = (?)`,
          req.body.value,
          req.body.id_receive
        );
        receive.run();
        receive.finalize();

        res.status(201).json(`Procedure carried out successfully.`);
      }
    );
  } catch (error) {
    return res.status(500).json(`Transfer failed.`);
  }
};
