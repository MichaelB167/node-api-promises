'use strict';

// Access Node's API to the file system
const fs = require('fs');

// read input from the command line
const stdin = '/dev/stdin';

// write output to terminal
const stdout = '/dev/stdout';

// set inFile to user specified file or the terminal if requested
let inFile = process.argv[2] === '-' ? stdin : process.argv[2];

// write to specified file or stdout if none.
let outFile = process.argv[3] ? process.argv[3] : stdout;

// append to stdout or truncate and overwrite otherwise.
let outFileFlag = outFile === stdout ? 'a' : 'w';

const readFile = (filename, success, fail) => {
  fs.readFile(filename, { encoding: 'utf8' }, (error, json) => {
    if (error) {
      fail(error);
    } else {
      success(json);
    }
  });
};

new Promise((resolve, reject) => {
  readFile(inFile, resolve, reject);
})
.then(JSON.parse)
.then((pojo) => {
  pojo.added = 'an added string';
  return pojo;
})
.then((pojo) => JSON.stringify(pojo, null, 2))
.then((json) =>
  new Promise((resolve, reject) => {
    fs.writeFile(outFile, json, { flag: outFileFlag }, error => {
      if (error) {
        reject(error);
      } else {
        resolve(null);
      }
    });
  }))
.catch(console.error)
.then(process.exit);
