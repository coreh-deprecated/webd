var oa = require('../lib/oa')
var expect = require('expect.js')

describe('OpenAnything', function() {
  it('should export a function named parse', function() {
    expect(oa.parse).to.be.a(Function)
  })
  it('should parse dates', function() {
    var result = oa.parse(
      { _: 'oa:date'
      , value: '2012-02-05T21:43:51.173Z'
      }
    )
    expect(result).to.be.a(Date)
  })
  it('should parse units', function() {
    var result = oa.parse(
      { _: 'oa:unit'
      , numerator: ['m']
      , denominator: ['s']
      }
    )
    expect(result).to.be.a(oa.Unit)
    expect(result.numerator).to.be.eql(['m'])
    expect(result.denominator).to.be.eql(['s'])
  })
  it('should parse measures', function() {
    var result = oa.parse(
      { _: 'oa:measure'
      , unit:
        { _: 'oa:unit'
        , numerator: ['m']
        , denominator: ['s']
        }
      , value: 0.5
      }
    )
    expect(result).to.be.a(oa.Measure)
    expect(result.value).to.be.a('number')
    expect(result.unit).to.be.a(oa.Unit)
  })
  it('should export a function named stringify', function() {
    expect(oa.stringify).to.be.a(Function);
  })
  it('should stringify dates', function() {
    var now = new Date()
    expect(oa.stringify(now)).to.be('{"_":"oa:date","value":"' + now.toJSON() + '"}')
  })
  it('should stringify units', function() {
    expect(oa.stringify(new oa.Unit('m', 's'))).to.be('{"_":"oa:unit","numerator":["m"],"denominator":["s"]}')
  })
  it('should stringify measures', function() {
    expect(oa.stringify(new oa.Measure(5, new oa.Unit('m', 's')))).to.be('{"_":"oa:measure","value":5,"unit":{"_":"oa:unit","numerator":["m"],"denominator":["s"]}}')
  })
})
