var webd = require('../lib/webd')
var expect = require('expect.js')

describe('WebD', function() {
  it('should export a function named parse', function() {
    expect(webd.parse).to.be.a(Function)
  })
  it('should parse dates', function() {
    var result = webd.parse(
      { _: 'webd:date'
      , value: '2012-02-05T21:43:51.173Z'
      }
    )
    expect(result).to.be.a(Date)
  })
  it('should parse units', function() {
    var result = webd.parse(
      { _: 'webd:unit'
      , numerator: ['m']
      , denominator: ['s']
      }
    )
    expect(result).to.be.a(webd.Unit)
    expect(result.numerator).to.be.eql(['m'])
    expect(result.denominator).to.be.eql(['s'])
  })
  it('should parse measures', function() {
    var result = webd.parse(
      { _: 'webd:measure'
      , unit:
        { _: 'webd:unit'
        , numerator: ['m']
        , denominator: ['s']
        }
      , value: 0.5
      }
    )
    expect(result).to.be.a(webd.Measure)
    expect(result.value).to.be.a('number')
    expect(result.unit).to.be.a(webd.Unit)
  })
  it('should export a function named stringify', function() {
    expect(webd.stringify).to.be.a(Function);
  })
  it('should stringify dates', function() {
    var now = new Date()
    expect(webd.stringify(now)).to.be('{"_":"webd:date","value":"' + now.toJSON() + '"}')
  })
  it('should stringify units', function() {
    expect(webd.stringify(new webd.Unit('m', 's'))).to.be('{"_":"webd:unit","numerator":["m"],"denominator":["s"]}')
  })
  it('should stringify measures', function() {
    expect(webd.stringify(new webd.Measure(5, new webd.Unit('m', 's')))).to.be('{"_":"webd:measure","value":5,"unit":{"_":"webd:unit","numerator":["m"],"denominator":["s"]}}')
  })
})
