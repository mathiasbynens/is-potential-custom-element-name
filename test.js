var assert = require('assert');
var isPotentialCustomElementName = require('./index.js');

describe('is-potential-custom-element-name', function() {
	it('returns a boolean indicating whether the given string is a potential custom element name', function() {
		assert.equal(isPotentialCustomElementName('foo-bar'), true);
		assert.equal(isPotentialCustomElementName('Foo-bar'), false);
		assert.equal(isPotentialCustomElementName('baz-©'), false);
		assert.equal(isPotentialCustomElementName('annotation-xml'), true);
	});
});
