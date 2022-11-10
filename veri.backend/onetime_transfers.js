const ORIGINATOR = "tz1N9QRNJ98mY8ZNENvHAMiaxgr8tWPE9pCK";
const { Pool } = require("pg");
const { URLSearchParams } = require('url');

const pool = new Pool();

const INSERT_COMMAND_SQL = `INSERT INTO peppermint.operations (originator, command) VALUES ('${ORIGINATOR}', $1)`;

const transfer_to_addresses = async ({ handler, token_id, addresses }) => {
  for (let addr of addresses) { 
    let command = {
      handler,
      name: "transfer",
      args: {
        amount: 1,
        token_id,
        from_address: ORIGINATOR,
        to_address: addr
      }
    };

    await pool.query(INSERT_COMMAND_SQL, [command]);
  }
};

// Transfer 'unseen' tokens (Octobre Numerique gifts):
transfer_to_addresses({
  handler: 'unseen',
  token_id: 2,
  addresses: [
  ]
});

