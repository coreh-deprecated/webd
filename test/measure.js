var webd = require('../lib/webd')
var expect = require('expect.js')

describe('webd.Measure', function() {
  var metersPerSecond = new webd.Unit('m', 's')
  var seconds = new webd.Unit('s')

  it('should be a constructor', function() {
    expect(webd.Measure).to.be.a(Function)
  })
  it('should create a valid measure', function() {
    var result = new webd.Measure(5, seconds)
    expect(result).to.be.a(webd.Measure)
    expect(result.value).to.be(5)
    expect(result.unit).to.be(seconds)
  })
  it('should add properly', function() {
    var m1 = new webd.Measure(5, seconds)
    var m2 = new webd.Measure(10, seconds)
    var m3 = m1.add(m2)
    expect(m3).to.be.a(webd.Measure)
    expect(m3.value).to.be(15)
    expect(m3.unit).to.be(seconds)
  })
  it('should not allow adding measurements with different units', function() {
    var m1 = new webd.Measure(5, metersPerSecond)
    var m2 = new webd.Measure(3, seconds)
    var m3 = m1.add(m2)
    expect(m3).to.be(null)
  })
  it('should multiply properly', function() {
    var m1 = new webd.Measure(5, metersPerSecond)
    var m2 = new webd.Measure(3, seconds)
    var m3 = m1.multiply(m2)
    expect(m3).to.be.a(webd.Measure)
    expect(m3.value).to.be(15)
    expect(m3.unit).to.be.a(webd.Unit)
    expect(m3.unit.numerator).to.be.eql(['m'])
    expect(m3.unit.denominator).to.be.eql([])
  })
  it('should convert properly to a string', function() {
    expect(new webd.Measure(5, new webd.Unit('m', 's')).toString()).to.be('5m/s')
    expect(new webd.Measure(5, new webd.Unit('m')).toString()).to.be('5m')
    expect(new webd.Measure(5, new webd.Unit([], 's')).toString()).to.be('5/s')
    expect(new webd.Measure(5, new webd.Unit()).toString()).to.be('5')
  })
})
