const ORIGINATOR = "tz1StQky9qKipBNEpjtUtsGVSpsp6cYZeTwh";
const TOKEN_ID = 14
// const CAPTCHA_URI = "https://www.google.com/recaptcha/api/siteverify"
// const RECAPTCHA_SECRET = ""
// const HOSTNAME = ""
// const CAPTCHA_TIMEOUT = 60000

// const fetch = require('node-fetch');
const { Pool } = require("pg");
const { URLSearchParams } = require('url');

const pool = new Pool();

const CHECK_UNIQUENESS_SQL = "SELECT COUNT(*) FROM veriadmin.addresses WHERE address = $1 AND token_id = $2";
const INSERT_ADDRESS_SQL = "INSERT INTO veriadmin.addresses (address, token_id, session) VALUES ($1, $2, $3)";
const INSERT_COMMAND_SQL = `INSERT INTO peppermint.operations (originator, command) VALUES ('${ORIGINATOR}', $1)`;
console.log(INSERT_COMMAND_SQL);

// const validate_recaptcha = async function(recaptcha_response, remoteip) {
//   let params = new URLSearchParams();
//   params.append('secret', RECAPTCHA_SECRET);
//   params.append('response', recaptcha_response);
//   params.append('remoteip', remoteip);

//   let response = await fetch(CAPTCHA_URI, {method: 'POST', body: params });

//   if ( !response.ok ) {
//     console.log("Recaptcha validation attempt failed.\n", JSON.stringify(response));
//     return false;
//   }

//   let response_body = await response.json();
//   console.log("Recaptcha validation response:\n", response_body);

//   if ( !response_body.success ) {
//     return false;
//   }
//   if ( response_body.hostname != HOSTNAME ) {
//     return false;
//   }
//   if ( Date.now() - Date.parse(response_body.challenge_ts) > CAPTCHA_TIMEOUT ) {
//     return false;
//   }

//   return true;
// };

const request_nft = async ({ tz_address, recaptcha_response }, ip, res) => {
  let client = {};
  let tx = false;
  try {
    // let recaptcha_success = await validate_recaptcha(recaptcha_response, ip);

    // if ( !recaptcha_success ) {
    //   console.log('Validation failed');
    //   res.status(401).json({
    //     message: "Recaptcha validation failed"
    //   });
    //   return;
    // }

    client = await pool.connect()
    await client.query('BEGIN');
    tx = true;

    let result = await client.query(CHECK_UNIQUENESS_SQL, [tz_address, TOKEN_ID]);

    if (result.rows[0].count > 0) {
      res.status(401).json({
        message: "Address already served"
      });
      return;
    }

    await client.query(INSERT_ADDRESS_SQL, [tz_address, TOKEN_ID, null]);

    let command = {
      handler: "veri",
      name: "mint",
      args: {
        amount: 1,
        token_id: TOKEN_ID,
        to_address: tz_address
      }
    };
    await client.query(INSERT_COMMAND_SQL, [command]);

    await client.query('COMMIT');
    tx = false;

    res.status(200).send("GREEN");

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error has occured",
      err,
    });
  } finally {
    if (tx) {
        await client.query('ROLLBACK');
    }
    if (client.release) {
        client.release();
    }
}
};

module.exports = { request_nft };
