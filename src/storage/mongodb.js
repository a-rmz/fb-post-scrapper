const mongoose = require('mongoose');
const YAML = require('yamljs');

const dbConfig = YAML.load('./src/config/database.yaml');

const connect = () => {
  // Use native promises
  mongoose.Promise = global.Promise;
  const {host, port, dbName} = dbConfig;
  let connectionString = `mongodb://${host}:${port}/${dbName}`;
  
  return mongoose.connect(connectionString, {
    useMongoClient: true
  });
};

module.exports = { connect };
