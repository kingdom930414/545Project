const MongoClient = require("mongodb").MongoClient;
const settings = require("./settings");
const config = settings.mongoConfig;

let connection = undefined;
let database = undefined;

module.exports = async () => {
  if (!connection) {
    connection = await MongoClient.connect(config.serverUrl,{useNewUrlParser: true,useUnifiedTopology: true } );
    database = await connection.db(config.database);
  }

  return database;
};
