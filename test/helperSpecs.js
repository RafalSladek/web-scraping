var assert = require("chai").assert;
var helper = require("../helper");

it("convert positive euro price to number", function(done) {
  const actuall = helper.convertDegusaPriceToNumber("1.549,30 €");
  assert.equal(actuall, 1549);
  done();
});

it("convert negative euro price to number", function(done) {
  const actuall = helper.convertDegusaPriceToNumber("-1.549,30 €");
  assert.equal(actuall, -1549);
  done();
});

it("convert zero euro price to number", function(done) {
  const actuall = helper.convertDegusaPriceToNumber("0,00 €");
  assert.equal(actuall, 0);
  done();
});

it("convert euro price without float and unit to number", function(done) {
  const actuall = helper.convertDegusaPriceToNumber("0");
  assert.equal(actuall, 0);
  done();
});

it("convert invalid euro price to number", function(done) {
  const actuall = helper.convertDegusaPriceToNumber("a");
  assert.isNaN(actuall, true);
  done();
});
