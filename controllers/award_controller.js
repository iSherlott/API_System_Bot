const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");

exports.find = async (req, res) => {
  try {
    let params = [...req.body.id];
    let query = `SELECT * FROM awards WHERE award_id IN (${params.fill("?")})`;

    await db.all(query, req.body.id, (error, rows) => {
      if (error) return res.status(400).json(`Find Failed`);
      return res.status(200).json(rows);
    });
  } catch (error) {
    return res.status(404).json(`Find Failed.`);
  }
};

exports.findOne = async (req, res) => {
  try {
    await db.all(
      `SELECT * FROM awards WHERE award_id = ?`,
      req.params.id,
      (error, rows) => {
        if (error) return res.status(400).json(error);
        if (rows.length != 1) return res.status(201).json("Divergent params");
        return res.status(200).json(rows[0]);
      }
    );
  } catch (error) {
    return res.status(404).json(`Find Failed.`);
  }
};

exports.findAll = async (req, res) => {
  try {
    await db.all(`SELECT * FROM awards`, (error, rows) => {
      if (error) return res.status(400).json(error);
      return res.status(200).json(rows);
    });
  } catch (error) {
    return res.status(404).json(`Find Failed`);
  }
};

exports.insert = async (req, res) => {
  try {
    if (
      !Object.keys(req.body).includes("award_id") ||
      Object.keys(req.body).length != 1
    )
      return res.status(403).json(`Invalid body.`);

    await db.all(
      `SELECT award_id FROM awards WHERE award_id = ?`,
      req.body.id,
      (error, rows) => {
        if (error) return res.status(400).json(error);
        if (rows.length != 0) return res.status(404).json(`Update Failed.`);

        let stm = db.prepare(
          `INSERT INTO awards ("award_id") VALUES (?);`,
          req.body.id
        );
        stm.run();
        stm.finalize();
        return res.status(200).json(`Update successfully.`);
      }
    );
  } catch (error) {
    return res.status(404).json(`Update Failed.`);
  }
};

exports.update = async (req, res) => {
  try {
    await db.all(
      `SELECT * FROM awards WHERE award_id = ?`,
      req.params.id,
      (error, rows) => {
        rows = rows[0];
        if (!rows) return res.status(404).json(`parameter not found`);
        if (Object.keys(req.body).includes("id"))
          return res.status(403).json(`Parameter entered cannot be changed`);

        for (let key of Object.keys(req.body))
          if (!Object.keys(rows).includes(key))
            return res.status(400).json(`Invalid Params`);

        for (let key in req.body) {
          let stm = db.prepare(
            `Update awards SET ${key} = ${req.body[key]} WHERE award_id = (?)`,
            req.params.id
          );
          stm.run();
          stm.finalize();
        }
        res.status(200).json(`Update successfully`);
      }
    );
  } catch (error) {
    return res.status(404).json(`Update Failed.`);
  }
};

exports.delete = async (req, res) => {
  try {
    await db.all(
      `SELECT * FROM awards WHERE award_id = ?`,
      req.params.id,
      (error, rows) => {
        if (rows.length != 1) return res.status(404).json(`Delete Failed.`);
        rows = rows[0];

        let stm = db.prepare(
          `DELETE FROM awards WHERE award_id = (?)`,
          req.params.id
        );
        stm.run();
        stm.finalize();
        return res.status(200).json(`Delete successfully.`);
      }
    );
  } catch (error) {
    return res.status(404).json(`Delete Failed.`);
  }
};
