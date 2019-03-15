

var assert = require('assert');
assert.doesNotThrow(
  function() {
    console.log("Nothing to see here");
  },
  '预期不抛出错误'
);