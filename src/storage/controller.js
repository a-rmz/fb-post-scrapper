const fs = require('fs');

class StorageController {
  constructor(config) {
    this.path = config.path;
  }

  getAll() {

  }

  insert(data) {
    fs.appendFileSync(this.path, JSON.stringify(data, null, 2)); 
  }
}

module.exports = StorageController;
