'use strict';

var assert = require('assert');
var url = require('url');

var size = require('require-main')();

describe('imageSizePromise()', () => {
  it('should detect the width and height of an image via HTTP.', () => {
    return size('http://placekitten.com/6000/4000')
    .then(dimensions => assert.deepEqual(dimensions, {width: 6000, height: 4000}));
  });

  it('should detect the width and height of an image via HTTPS.', () => {
    return size('https://raw.githubusercontent.com/shinnn/image-size-stream/master/test/fixture.png')
    .then(dimensions => assert.deepEqual(dimensions, {width: 673, height: 506}));
  });

  it('should accept an object of request options.', () => {
    return size(url.parse('http://placekitten.com/6000/4000'))
    .then(dimensions => assert.deepEqual(dimensions, {width: 6000, height: 4000}));
  });

  it('should be rejected when the stream receives an unsupported file.', () => {
    return size('http://www.example.com/')
    .then(val => assert(!val, 'Expecting a rejection.'))
    .catch(err => {
      assert.throws(() => assert.ifError(err), TypeError);
    });
  });

  it('should be rejected when the protocol is neither HTTP nor HTTPS.', () => {
    return size('ws://echo.websocket.org')
    .then(val => assert(!val, 'Expecting a rejection.'))
    .catch(err => {
      assert.throws(() => assert.ifError(err), /protocol/);
    });
  });
});
