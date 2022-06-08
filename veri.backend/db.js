require('dotenv').config();
const { Client } = require("pg");

const client = new Client()
client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

const select_query = `
SELECT COUNT(*) FROM veri."storage.ledger_live"
WHERE idx_assets_address = $1
`;
const getTezosAddress = async (address, res) => {
  try {
    client.connect();
    await client.query(select_query, [address.id], (err, db_res) => {
      if (err) {
        res.status(400).json({
          message: "Some error in database occured",
          err,
        });
        client.end();
      }

      const count = parseInt(db_res.rows[0].count);

      if (count === 0) {
        res.status(200).send("GREEN");
      } else {
        res.status(200).send("RED");
      }

      client.end();
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
};

module.exports = getTezosAddress;
