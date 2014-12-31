# http-image-size-promise 

[![Build Status](https://travis-ci.org/shinnn/http-image-size-promise.svg?branch=master)](https://travis-ci.org/shinnn/http-image-size-promise)
[![Build status](https://ci.appveyor.com/api/projects/status/mqc94tx1srm6s7uv?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/http-image-size-promise)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/http-image-size-promise.svg?style=flat)](https://coveralls.io/r/shinnn/http-image-size-promise)
[![Dependency Status](https://david-dm.org/shinnn/http-image-size-promise.svg)](https://david-dm.org/shinnn/http-image-size-promise)
[![devDependency Status](https://david-dm.org/shinnn/http-image-size-promise/dev-status.svg)](https://david-dm.org/shinnn/http-image-size-promise#info=devDependencies)

Promise to detect the dimensions of an image file via HTTP(S), using [image-size-stream](https://github.com/shinnn/image-size-stream)

```javascript
var httpImageSizePromise = require('http-image-size-promise');

httpImageSizePromise('http://placehold.it/350x150')
.then(function(dimensions) {
  dimensions; //=> {width: 350, height: 150, type: 'gif'}
})
.catch(function(reason) {
  console.warn(reason);
});
```

## Installation

[![NPM version](https://img.shields.io/npm/v/http-image-size-promise.svg?style=flat)](https://www.npmjs.com/package/http-image-size-promise)

[Use npm.](https://docs.npmjs.com/cli/install)

```sh
npm install --save http-image-size-promise
```

## Supported image formats

Check [image-size-stream](https://github.com/shinnn/image-size-stream#supported-image-formats) doc.

## API

```javascript
var httpImageSizePromise = require('http-image-size-promise');
```

### httpImageSizePromise(*imageFileUrl* [, *options*])

*imageFileUrl*: `String` (URL) or `Object` ([parsed URL object](http://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost))  
*options*: `Object` (directly passed to the [got](https://github.com/sindresorhus/got#options) options and the [image-size-stream](https://github.com/shinnn/image-size-stream) option)  
Return: `Object` ([Promise](http://promisesaplus.com/))

It gets an image file via [got](https://github.com/sindresorhus/got) module.

When it detects the width and height of the image, it will be [*fulfilled*](http://promisesaplus.com/#point-26) with an object in the form `{width: [Number], height: [Number], type: [String]}` as an argument of callback.

`type` will be one of the following strings: `bmp` `gif` `jpg` `png` `psd` `svg` `tiff` `webp`

When it fails to get the file or the file is not supported, it will be [*rejected*](http://promisesaplus.com/#point-30) with an error as an argument of callback.

```javascript
var imageSize = httpImageSizePromise();

var onFulfilled = function(dimensions) {
  console.log('Size: ' + dimensions.width + ' x ' + dimensions.height);
  console.log('Type: ' + dimensions.type);
};

var onRejected = function(reason) {
  console.warn(reason);
};

imageSize('https://url.to/image.jpg').then(onFulfilled, onRejected);
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT LIcense](./LICENSE).
