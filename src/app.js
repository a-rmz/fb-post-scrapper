const Scrapper = require('./scrapper');
const StorageController = require('./storage/controller');
const YAML = require('yamljs');

const configuration = YAML.load('./config.yaml');
const pageList = YAML.load('./pageList.yaml');

const storageController = new StorageController();
const scrapper = new Scrapper(configuration, storageController);
// storageController.getAll()
//   .then(data => console.log(data));

scrapper.setPageList(pageList);
const rawData = scrapper.scrape();

// rawData
//   .then(data => storageController.save(data))
//   .then(() => console.log('done'))
//   .catch(error => console.log(error));

// Must have .html extension
// const path = '';

