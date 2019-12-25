var expect  = require('chai').expect;
var helper = require('../helper');

it('convert euro price to number', function(done) {
    const actuall = helper.convertDegusaPriceToNumber("1.549,30 €");
    expect(actuall).to.equal(1549);
    done();
});