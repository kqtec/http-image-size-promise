'use strict';

var url = require('url');

var size = require('./');
var test = require('tape');

test('imageSizePromise()', function(t) {
  t.plan(11);

  size('http://placekitten.com/6000/4000').then(function(dimensions) {
    t.deepEqual(
      dimensions,
      {
        width: 6000,
        height: 4000,
        type: 'jpg'
      },
      'should detect the width and height of an image via HTTP.'
    );
  }, t.fail);

  size('https://raw.githubusercontent.com/shinnn/image-size-stream/master/test/fixture.webp')
  .then(function(dimensions) {
    t.deepEqual(
      dimensions,
      {width: 1, height: 1, type: 'webp'},
      'should detect the width and height of an image via HTTPS.'
    );
  }, t.fail);

  size(url.parse('http://placekitten.com/60/40')).then(function(dimensions) {
    t.deepEqual(
      dimensions,
      {width: 60, height: 40, type: 'jpg'},
      'should accept an object of request options.'
    );
  }, t.fail);

  size('http://www.example.com/', {limit: 1}).then(t.fail, function(err) {
    t.equal(
      err.message,
      'Reached the limit before detecting image type.',
      'should support image-size-stream\'s option.'
    );
  });

  size('http://www.example.com/', {timeout: 1}).then(t.fail, function(err) {
    t.equal(err.code, 'ETIMEDOUT', 'should support got\'s options.');
  });

  size('http://www.example.com/').then(t.fail, function(err) {
    t.equal(
      err.name,
      'TypeError',
      'should be rejected when the stream receives an unsupported file.'
    );
  });

  size('http://__no.t___/f.o/u.nd/__').then(t.fail, function(err) {
    t.equal(
      err.code,
      'ENOTFOUND',
      'should be rejected when it cannot find the target content.'
    );
  });

  t.throws(
    size.bind(null, 'ws://echo.websocket.org'),
    /not supported/,
    'should throw an error the protocol is neither HTTP nor HTTPS.'
  );

  t.throws(
    size.bind(null, true),
    /TypeError.*url/,
    'should throw a type error when the first argument is not a string or an object.'
  );

  t.throws(
    size.bind(null, 'http://placekitten.com/60/40', {limit: '10000'}),
    /TypeError.*must be a number/,
    'should throw a type error when it takes invalid option.'
  );

  t.throws(
    size.bind(null),
    /TypeError.*url/,
    'should throw a type error when it takes no arguments.'
  );
});
