# http-image-size-promise 

[![NPM version](https://badge.fury.io/js/http-image-size-promise.svg)](http://badge.fury.io/js/http-image-size-promise)
[![Build Status](https://travis-ci.org/shinnn/http-image-size-promise.svg?branch=master)](https://travis-ci.org/shinnn/http-image-size-promise)
[![Dependency Status](https://david-dm.org/shinnn/http-image-size-promise.svg)](https://david-dm.org/shinnn/http-image-size-promise)
[![devDependency Status](https://david-dm.org/shinnn/http-image-size-promise/dev-status.svg)](https://david-dm.org/shinnn/http-image-size-promise#info=devDependencies)

Promise to detect the dimensions of an image file via HTTP(S), using [image-size-stream](https://github.com/shinnn/image-size-stream)

```javascript
var httpImageSizePromise = require('http-image-size-promise');

httpImageSizePromise('http://placehold.it/350x150')
.then(function(dimensions) {
  console.log(dimensions);
})
.catch(function(reason) {
  throw reason;
});

//=> yields: {width: 350, height: 150}
```

## Installation

[Install with npm](https://www.npmjs.org/doc/cli/npm-install.html). (Make sure you have installed [Node](http://nodejs.org/))

```
npm install --save http-image-size-promise
```

## Supported image formats

* [BMP](http://wikipedia.org/wiki/BMP_file_format)
* [GIF](http://wikipedia.org/wiki/Graphics_Interchange_Format)
* [JPEG](http://wikipedia.org/wiki/JPEG)
* [PNG](http://wikipedia.org/wiki/Portable_Network_Graphics)
* [PSD](http://wikipedia.org/wiki/Adobe_Photoshop#File_format)
* [TIFF](http://wikipedia.org/wiki/Tagged_Image_File_Format)
* [WebP](http://wikipedia.org/wiki/WebP)

## API

```javascript
var httpImageSizePromise = require('http-image-size-promise');
```

### httpImageSizePromise(imageFileUrl)

imageFileUrlStr: `String` which starts with `"http:"` or `"https:"`  
Return: [`Promise`](http://promises-aplus.github.io/promises-spec/)

First, it gets the image file via [HTTP](http://nodejs.org/api/http.html#http_http_get_options_callback) or [HTTPS](http://nodejs.org/api/https.html#https_https_get_options_callback). The protocol is automatically selected according to the URL.

It will be [*fulfilled*](http://promises-aplus.github.io/promises-spec/#point-26) with an object in the form `{width: [Number], height: [Number]}` when it detects the width and height of the image file.

It will be [*rejected*](http://promises-aplus.github.io/promises-spec/#point-30) with an error when it fails to get the file, or the file is not supported.

```javascript
var imageSize = httpImageSizePromise();

var onFulfilled = function(dimensions) {
  console.log('Size: ' + dimensions.width + ' x ' + dimensions.height);
};

var onRejected = function(reason) {
  throw reason;
};

imageSize('https://url.to/image.jpg').then(onFulfilled, onRejected);
```

### httpImageSizePromise(imageFileUrlObj)

imageFileUrlObj: `Object`

It also accepts an `Object` of [request options](http://nodejs.org/api/http.html#http_http_request_options_callback). It is useful to reuse the result of [url.parse()](http://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost).

```javascript
var url = require('url');
var imageSize = httpImageSizePromise();

var options = url.parse('https://url.to/image.gif');
//=> {protocol: 'https:', slashes: true, auth: null, ...}

imageSize(options).then(onFulfilled, onRejected);
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT LIcense](./LICENSE).
