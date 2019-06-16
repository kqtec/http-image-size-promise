/*!
 * image-size-promise | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/image-size-stream
*/
'use strict';

var image_decode_1 = require("image-decode");
var get_image_base64_1 = require("get-image-base64");

let ImageSize =function(uri,options){
  return new Promise((resolve, reject) => {
    get_image_base64_1(uri,function(data){
      resolve(image_decode_1(data))
    })
  });
}

module.default.exports = ImageSize
