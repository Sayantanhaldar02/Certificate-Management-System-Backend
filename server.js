require("dotenv").config()
const app = require('./app');
const app_configuration = require("./config/config");
const db_connection = require("./config/db_config");

const port = app_configuration.port 

db_connection(app_configuration.db_url)

// Start the server and listen on the defined port.
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));