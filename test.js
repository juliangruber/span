var span = require('./index.js');
var assert = require('assert');

assert(span('1day') == 86400000);
assert(span('10 hours') == 36000000);
assert(span('2 stunden') == 7200000);
assert(span('1 min') == 60000);
assert(span('5s') == 5000);
assert(span('100') == '100ms');
assert(span(100) == '100ms');
assert(span(60000) == '1m');
assert(span(2*60000) == '2m');
assert(span(span('10 hours')) == '10h');
assert(span(266400000) == '3d 2h');
assert(span('3d 2h') == 266400000);

console.log('All tests passed.')