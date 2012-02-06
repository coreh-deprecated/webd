var oa = require('../lib/oa')
var expect = require('expect.js')

describe('oa.Measure', function() {
  var metersPerSecond = new oa.Unit('m', 's')
  var seconds = new oa.Unit('s')

  it('should be a constructor', function() {
    expect(oa.Measure).to.be.a(Function)
  })
  it('should create a valid measure', function() {
    var result = new oa.Measure(5, seconds)
    expect(result).to.be.a(oa.Measure)
    expect(result.value).to.be(5)
    expect(result.unit).to.be(seconds)
  })
  it('should add properly', function() {
    var m1 = new oa.Measure(5, seconds)
    var m2 = new oa.Measure(10, seconds)
    var m3 = m1.add(m2)
    expect(m3).to.be.a(oa.Measure)
    expect(m3.value).to.be(15)
    expect(m3.unit).to.be(seconds)
  })
  it('should not allow adding measurements with different units', function() {
    var m1 = new oa.Measure(5, metersPerSecond)
    var m2 = new oa.Measure(3, seconds)
    var m3 = m1.add(m2)
    expect(m3).to.be(null)
  })
  it('should multiply properly', function() {
    var m1 = new oa.Measure(5, metersPerSecond)
    var m2 = new oa.Measure(3, seconds)
    var m3 = m1.multiply(m2)
    expect(m3).to.be.a(oa.Measure)
    expect(m3.value).to.be(15)
    expect(m3.unit).to.be.a(oa.Unit)
    expect(m3.unit.numerator).to.be.eql(['m'])
    expect(m3.unit.denominator).to.be.eql([])
  })
  it('should convert properly to a string', function() {
    expect(new oa.Measure(5, new oa.Unit('m', 's')).toString()).to.be('5m/s')
    expect(new oa.Measure(5, new oa.Unit('m')).toString()).to.be('5m')
    expect(new oa.Measure(5, new oa.Unit([], 's')).toString()).to.be('5/s')
    expect(new oa.Measure(5, new oa.Unit()).toString()).to.be('5')
  })
})
