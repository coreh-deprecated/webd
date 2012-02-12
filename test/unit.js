var webd = require('../lib/webd')
var expect = require('expect.js')

describe('webd.Unit', function() {
  it('should be a constructor', function() {
    expect(webd.Unit).to.be.a(Function)
  })
  it('should create correct Units when given numerators and denominators', function() {
    var result = new webd.Unit(['m'],['s'])
    expect(result).to.be.a(webd.Unit)
    expect(result.numerator).to.be.eql(['m'])
    expect(result.denominator).to.be.eql(['s'])
  })
  it('should accept numerators and denominators outside of arrays', function() {
    var result = new webd.Unit('m', 's')
    expect(result).to.be.a(webd.Unit)
    expect(result.numerator).to.be.eql(['m'])
    expect(result.denominator).to.be.eql(['s'])
  })
  it('should accept empty numerators', function() {
    var result = new webd.Unit([], ['s']) // Hertz
    expect(result).to.be.a(webd.Unit)
    expect(result.numerator).to.be.eql([])
    expect(result.denominator).to.be.eql(['s'])
  })
  it('should accept empty denominators', function() {
    var result = new webd.Unit(['s'], []) // Seconds
    expect(result).to.be.a(webd.Unit)
    expect(result.numerator).to.be.eql(['s'])
    expect(result.denominator).to.be.eql([])
  })
  it('should convert properly to a string', function() {
    expect(new webd.Unit(['m'], ['s']).toString()).to.be('m/s')
    expect(new webd.Unit([], ['s']).toString()).to.be('1/s')
    expect(new webd.Unit(['s'], []).toString()).to.be('s')
    expect(new webd.Unit([], []).toString()).to.be('1')
  })
  it('should multiply correctly', function() {
    var u1 = new webd.Unit('m', 's')
    var u2 = new webd.Unit('atoms', 'kg')
    var u3 = u1.multiply(u2)
    expect(u3).to.be.a(webd.Unit)
    expect(u3.numerator).to.be.eql(['atoms', 'm'])
    expect(u3.denominator).to.be.eql(['kg', 's'])
  })
  it('should simplify correctly', function() {
    var u1 = new webd.Unit('m', ['s', 's'])
    var u2 = new webd.Unit('s')
    var u3 = u1.multiply(u2)
    expect(u3).to.be.a(webd.Unit)
    expect(u3.numerator).to.be.eql(['m'])
    expect(u3.denominator).to.be.eql(['s'])
  })
})


