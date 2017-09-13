const Scrapper = require('./scrapper');
const StorageController= require('./storage/controller');
const exportHMTL = require('./io/html');
const YAML = require('yamljs');

const configuration = YAML.load('./config.yaml');
const pageList = YAML.load('./pageList.yaml');

const scrapper = new Scrapper(configuration);
const storageController = new StorageController();
// storageController.getAll()
  // .then(data => console.log(data));

scrapper.setPageList(pageList);
const rawData = scrapper.scrape();

rawData
  .then(data => storageController.save(data))
  .catch(error => console.log(error));

// Must have .html extension
// const path = '';

