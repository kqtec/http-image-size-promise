/*!
 * image-size-promise | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/image-size-stream
*/
'use strict';

var got = require('got');
var imageSizeStream = require('image-size-stream');
var wrapPromise = require('wrap-promise');

module.exports = function httpImageSizePromise(url, options) {
  var proxy;
  var size = imageSizeStream(options);

  return wrapPromise(function(resolve, reject) {
    size
      .on('error', function(err) {
        proxy.destroy();
        reject(err);
      })
      .on('size', function(dimensions) {
        proxy.destroy();
        resolve(dimensions);
      });

    proxy = got(url, options)
      .on('error', reject)
      .pipe(size);
  });
};
