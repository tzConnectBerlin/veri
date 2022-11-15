const ORIGINATOR = "tz1N9QRNJ98mY8ZNENvHAMiaxgr8tWPE9pCK";

const CAMPAIGNS = {
  example: {
    peppermint_handler: 'example',
    token_id: 1991,
    availability: 100
  }
};

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

const GET_NUMBER_SQL = "SELECT COUNT(*) FROM veriadmin.addresses WHERE token_id = $1";

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


const request_drop = async ({ tz_address, recaptcha_response, campaign }, ip, res) => {
  let campaigndata = CAMPAIGNS.campaign;
  if (!campaigndata) {
    res.status(401).json({
      message: "Invalid campaign"
    });
    return;
  }

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

    let result = await client.query(CHECK_UNIQUENESS_SQL, [tz_address, campaign]);

    if (result.rows[0].count > 0) {
      res.status(401).json({
        message: "Address already served"
      });
      return;
    }

    await client.query(INSERT_ADDRESS_SQL, [tz_address, campaign, null]);

    result = await client.query(GET_NUMBER_SQL, [campaign]);
    let number_dropped = parseInt(result.rows[0].count);

    if (number_dropped >= campaigndata.capacity) {
      res.status(401).json({
	      message: "Drop capacity exhausted"
      });
    }

    let drop_command = {
      handler: campaigndata.peppermint_handler,
      name: "transfer",
      args: {
        amount: 1,
	      token_id: campaigndata.token_id,
	      from_address: ORIGINATOR,
	      to_address: tz_address
      }
    };

/*## for sequential token drops...
    let evolutionary_command = {
      handler: "evolutionary",
      name: "transfer",
      args: {
        amount: 1,
        token_id: veri_no + 1,
        from_address: ORIGINATOR,
        to_address: tz_address
      }
    };*/

    await client.query(INSERT_COMMAND_SQL, [drop_command]);

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


const request_veri = async ({ tz_address, recaptcha_response, token_id }, ip, res) => {
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

    let result = await client.query(CHECK_UNIQUENESS_SQL, [tz_address, token_id]);

    if (result.rows[0].count > 0) {
      res.status(401).json({
        message: "Address already served"
      });
      return;
    }

   await client.query(INSERT_ADDRESS_SQL, [tz_address, token_id, null]);

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

module.exports = { request_drop, request_veri };
