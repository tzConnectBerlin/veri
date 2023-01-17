# VERI-Backend

**VERI-Backend**, as the name suggest, is the backend services for the **VERI** project. **VERI** A token used for verification of attendance of digital and physical events. 

## Getting started

### Prerequisite

**VERI-Backend** requires the below dependencies:

1. Node and npm/yarn
2. Postgres SQL
3. Peppermint
4. PeppermintEry
5. A valid `config` file or ENV Configs

Peppermint and Peppermintery and developed in-house and the codebase and documentation can be found [here](https://github.com/tzConnectBerlin/peppermint) and [here](https://github.com/tzConnectBerlin/peppermintEry) . Please use the `veri` branch while build/running **Peppermintery** to enable **Veri** related feature sets. You can generate a `config` file with the template given in the **Project Configuration** section. 

### Installation

If the  Prerequisites are full-filled then you can proceed to the installation. The next command will install *nodejs* libraries to the project root:

``npm install ``
or
``yarn install``

### Setting Environment Variable

**VERI-Backend** relies upon environment variable `NODE_ENV` to determine which environment variables it should load at runtime. `NODE_ENV`  can be set to `development`, `test` or `production`. Please set the correct value corresponding to your environment.  
  

## Buliding & Running VERI-Backend

The project can be run in development mode using the below command:

``npm start``
or
``yarn start``

This will start a *nodemon* instance of the project, which monitors for file/configuration change and restarts the program accordingly. This is the recommended way to run the app in a development mode.

**VERI-Backend** can also be built and served with *swc*. Building can theoretically make the app around *70%* faster by removing *TS* checking and great for deployment environments. To build the app use the below command:

``npm run build``
or
``yarn run build``

you can then serve the app by going to `/dist` directory and using `node app.js` command.
 
 If everything is successful the *command line* will show you a success message showing the current environment and the port number (5000 as default). 

### Database migration

You might need to initialize the database with the correct tables so that **VERI-Backend** can interact with it. **VERI-Backend** has built-in SQL query builder which can be used to migrate the database. Data migration occurs with the below command:

``npm run migrate``
or
``yarn run migrate``

You can make new migrations with the below command:

``npm run make:migration [migration-name]``
or
``yarn run make:migration [migration-name]``

Our migration engine (*Knex*) will create a migration file at `/src/databases/migration` with the name *timestamp_[migration-name]*. This file can again be used with the `migrate` command to update the database with new changes.

If you want to downgrade a migration you can use the below command:

``npm run rollback``
or
``yarn run rollback``

This will *rollback* the previous migration and particularly useful in a bad database upgrade. 

### Database seeding

**VERI-Backend** also supports seeding initial values to the database. With the current configuration, a *superadmin* account with password *veriisawesome* can be seeded to the database with the below command:

``npm run seed``
or
``yarn run seed``

You can also create your own seed files using:

``npm run make:seed [seed-name]``
or
``yarn run make:seed [seed-name]``

commands. Please refer to the `migration` chapter to understand how and where these seed files are generated and located. 



## Project configuration

**VERI-Backend** requires a **configuration file** or **ENVIRONMENT VARIABLES** to load it's internal structure. If the project is running is development mode (**NODE_ENV = development**) then a configuration file namely `.env.development.local` needs to be present in the project root. The file can follow the below template:

```
# PORT
PORT = [local port]

# DATABASE
DB_PROTOCOL = postgresql
DB_HOST = [db host]
DB_PORT = [db port]
DB_USER = [db user]
DB_PASSWORD = [db password]
DB_DATABASE = [database name]

# TOKEN
SECRET_KEY = [secretKey] //to sign tokens and passwords

# LOG
LOG_FORMAT = dev //project log level 
LOG_DIR = ../logs //log directory

# CORS
ORIGIN = '' //cors origin
CREDENTIALS = [true] //cookie support

# PEPPERMINTERY
PEPPERMINTERY_URL = [peppermintery instance URL]

# DATA PATH
DATA_PATH = [file upload path]

# Base
BASE_PATH = [base path of the project]

```

For a *test* or *production* deployment, these constants need to be put in environment variables of the deployment machine. 

## API documentation

**VERI-Backend** supports interactive API Documentation through *Swagger*. API-docs can be loaded through the below URL:

`http://[deployment-path]/[base-path]/api-docs`

The **front-end** of the API docs are generated using *swagger-ui*  and the definitions can be found at `/swagger.yaml`. The UI is fully interactive and the APIs are compatible with *OSS 3.0*.

## Common Errors

This section tries to solve some of the common errors that might happen when you are running the application for the first time. 

1. `TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined`:
	Your 'NODE_ENV' environment variable is not set. Please set it to 'development', 'test' or 'production'
2. `cannot connect to database`:
Please check if `postgres` is running, you have the correct permission and the db configuration is correct.
3. General migration error:
Please check if the migratory *up* and *down* functions in a migration file complements each other. For more information visit https://knexjs.org/guide/migrations.html.
4. ` app crashed - waiting for file changes before starting...`
It mostly happens if you have more than one instance running at the same machine or in other words if one instance is blocking the port. There could also be other crashes which you can investigate through the log file located at `/src/logs/error`. 
