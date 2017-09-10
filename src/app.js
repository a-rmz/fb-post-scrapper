const Scrapper = require('./scrapper');
const StorageController= require('./storage/controller');
const exportHMTL = require('./io/html');
const YAML = require('yamljs');

const configuration = YAML.load('./config.yaml');
const pageList = YAML.load('./pageList.yaml');

const scrapper = new Scrapper(configuration);

scrapper.setPageList(pageList);
const rawData = scrapper.scrape();

// Must have .html extension
const path = '';

rawData
  .then(data => {
    exportHMTL(path, data);
  });
