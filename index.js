'use strict';

const fs = require('fs');
const path = require('path');
const extType = require('config')('extension');

const driver = {};
let tmp;

/* original driver. */
fs.readdirSync(__dirname)
  .filter(m => {
    return fs.statSync(path.join(__dirname, m)).isDirectory() && m !== '.git' && m !== 'tests';
  })
  .forEach( m => {
    driver[m] = {};
    fs.readdirSync(path.join(__dirname, m)).forEach( s => { // snapshot ...
      if (s !== '.DS_Store' && path.extname(s) !== '.json') {
        tmp = require(path.join(__dirname, m, s));
        tmp.ref = driver;
        driver[m][path.basename(s, '.js')] = tmp;
      }
    });
  });

/* driver with extensions. */
if (extType) {
  const extPath = path.join(__dirname, 'extensions', extType);
  let extPathList = [];
  try {
    extPathList = fs.readdirSync(extPath);
  } catch (err) {
    console.log();
  }
  extPathList.filter( m => { // cinder ...
    return fs.statSync(path.join(extPath, m)).isDirectory();
  }).forEach( m => {
    if ( !driver[m] ) {
      driver[m] = {};
    }
    fs.readdirSync(extPath + '/' + m).forEach( s => { // snapshot ...
      if (s !== '.DS_Store') {
        driver[m][path.basename(s, '.js')] = require(extPath + '/' + m + '/' + s);
      }
    });
  });
}

module.exports = driver;
