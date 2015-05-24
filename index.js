var slice = Array.prototype.slice;

module.exports = function errback(fn) {
    return function errbacked() {
        return fn.apply(this, [null].concat(slice.call(arguments)));
    };
};
