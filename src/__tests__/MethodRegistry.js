var expect = require('chai').expect
const { MethodsRegistry } = require('../')

describe('Basic Methods Resgitry', () => {
    
    it('Correctly register app title', () => {
        function test() { return 'test' }
        MethodsRegistry.registerMethod('testMethod', test)
        expect(MethodsRegistry.getMethod('testMethod')).to.equal(test)
    })
})