'use strict';

const fs = require('fs');

const readJSON = (filename, callback) => {
  fs.readFile(filename, 'utf8', (err, res) => {
    if (err) {
      return callback(err); // what's going on here?
      // if there's an error, return the callback error
      // and escape the function
    }

    callback(null, JSON.parse(res));
    // what if JSON.parse errors out? exits the program, dumps callstack
    //once the file is read, the callback goes to the event queue
  });
};

module.exports = readJSON;
