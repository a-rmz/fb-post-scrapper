const Scrapper = require('./scrapper');
const YAML = require('yamljs');

const configuration = YAML.load('./config.yaml');
const pageList = YAML.load('./pageList.yaml');

// console.log(configuration);
// console.log(pageList);

const scrapper = new Scrapper(configuration);
scrapper.setPageList(pageList);
const rawData = scrapper.scrape();

rawData
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  });
