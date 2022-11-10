const ORIGINATOR = "tz1N9QRNJ98mY8ZNENvHAMiaxgr8tWPE9pCK";
const { Pool } = require("pg");
const { URLSearchParams } = require('url');

const pool = new Pool();

const INSERT_COMMAND_SQL = `INSERT INTO peppermint.operations (originator, command) VALUES ('${ORIGINATOR}', $1)`;


const refund_sequential = async ({ handler, from_id, to_id, refund_address }) => {
  for ( let token_id = from_id; token_id <= to_id; token_id++ ) {
    let command = {
      handler,
      name: "transfer",
      args: {
	      amount: 1,
	      token_id,
	      from_address: ORIGINATOR,
	      to_address: refund_address
      }
    };

    await pool.query(INSERT_COMMAND_SQL, [command]);
  }
};

const refund_amount = async ({ handler, token_id, amount, refund_address }) => {
  let command = {
    handler,
    name: "transfer",
    args: {
      amount,
      token_id,
      from_address: ORIGINATOR,
      to_address: refund_address
    }
  };

  await pool.query(INSERT_COMMAND_SQL, [command]);
};

// Nagel-Draxler refunds
//refund_amount({ handler: 'human', token_id: 0, amount: 41, refund_address: 'tz1SxMMwHUMeprG9gm2QuMHCcWCNdPkGgYpm' });
//refund_sequential({ handler: 'evolutionary', from_id: 30, to_id: 70, refund_address: 'tz1dne2qf8eMxsumVx61QMMbrzATQP8Ze356' });
