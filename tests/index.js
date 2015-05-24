var test = require('tape');
var errback = require('../');

test('call sync api', function (t) {
    t.plan(2);

    var result = {};

    function doStuff(callback) {
        return callback(result);
    }

    doStuff(errback(function (error, result) {
        t.equal(typeof result, 'object');
        t.equal(error, null);
    }));
});

test('call async api', function (t) {
    t.plan(2);

    var result = {};

    function doStuff(callback) {
        setImmediate(function () {
            return callback(result);
        });
    }

    doStuff(errback(function (error, result) {
        t.equal(typeof result, 'object');
        t.equal(error, null);
    }));
});

test('context maintained', function (t) {
    t.plan(1);

    var context = {};
    var callback = errback(function (error, result) {
        t.equal(this, context);
    });

    callback.call(context);
});
