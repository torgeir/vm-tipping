var superagent = require('superagent');
var Promise = require('bluebird');

exports.get = url => {
  return new Promise((resolve, reject) =>
    superagent.get(url)
              .end((error, res) => {
                if (error) reject(error);
                else resolve(res);
              }));
};
