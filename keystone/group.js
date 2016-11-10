'use strict';

var Base = require('../base.js');
var driver = new Base();

driver.listUsersInGroup = (token, remote, groupId, callback) => {
  return driver.getMethod(
    `${remote}/v3/groups/${groupId}/users`,
    token,
    callback
  );
};

/*** Promise ***/
driver.listUsersInGroupAsync = (token, remote, groupId) => {
  return driver.getMethodAsync(
    `${remote}/v3/groups/${groupId}/users`,
    token
  );
};

module.exports = driver;