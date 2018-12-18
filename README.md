# Pet Tracker

## Installation

### Client
if running production mode go to the client folder and run `npm run build`.

This will output the production build to the `/dist` folder. Vue runs in history mode, make sure to configure your webserver to redirect all requests on `index.html`.

### Server

Go in `api/config/` and fill in your credentials in `index.js`

Create the Postgresql database and run the migration and seeds script:

```sh
cd api
./node_modules/knex/bin/cli.js migrate:latest --knexfile ./database/knexfile.js
./node_modules/knex/bin/cli.js seed:run --knexfile ./database/knexfile.js
```
Thils will create the tables and fill them with some data to work with.

To run the server, run `node index.js` from the `api` folder.

If you want mails to be sent, don't forget to export the env mode variable and set it to `production` before running the server

```sh
export MODE=production
```
