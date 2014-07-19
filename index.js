/*!
 * image-size-promise | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/image-size-stream
*/

'use strict';

var ES6Promise = global.Promise || require('es6-promise').Promise;

var httpOrHttps = require('http-s');
var imageSizeStream = require('image-size-stream');

module.exports = function httpImageSizePromise(url) {
  return new ES6Promise(function(resolve, reject) {
    var size = imageSizeStream()
    .on('size', function(dimensions) {
      request.abort();
      resolve(dimensions);
    })
    .on('error', reject);

    try {
      var request = httpOrHttps(url).get(url, function(response) {
        response
        .on('error', reject)
        .pipe(size);
      });
    } catch (e) {
      reject(e);
    }
  });
};
