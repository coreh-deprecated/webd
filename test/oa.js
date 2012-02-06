var oa = require('../lib/oa')
var expect = require('expect.js')

describe('OpenAnything', function() {
  it('should export a function named parse', function() {
    expect(oa.parse).to.be.a(Function)
  })
  it('should parse dates', function() {
    var result = oa.parse(
      { type: 'oa:date'
      , value: '2012-02-05T21:43:51.173Z'
      }
    )
    expect(result).to.be.a(Date)
  })
  it('should parse numbers', function() {
    var result = oa.parse(
      { type: 'oa:number'
      , value: 0.5
      }
    )
    expect(result).to.be.a('number')
    expect(result).to.be.eql(0.5)
  })
  it('should parse units', function() {
    var result = oa.parse(
      { type: 'oa:unit'
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
      { type: 'oa:measure'
      , unit:
        { type: 'oa:unit'
        , numerator: ['m']
        , denominator: ['s']
        }
      , value: 
        { type: 'oa:number'
        , value: 0.5
        }
      }
    )
    expect(result).to.be.a(oa.Measure)
    expect(result.value).to.be.a('number')
    expect(result.unit).to.be.a(oa.Unit)
  })
  it('should stringify numbers', function() {
    expect(oa.stringify(5)).to.be('{"type":"oa:number","value":5}')
  })
  it('should stringify dates', function() {
    var now = new Date()
    expect(oa.stringify(now)).to.be('{"type":"oa:date","value":"' + now.toJSON() + '"}')
  })
  it('should stringify units', function() {
    expect(oa.stringify(new oa.Unit('m', 's'))).to.be('{"type":"oa:unit","numerator":["m"],"denominator":["s"]}')
  })
  it('should stringify measures', function() {
    expect(oa.stringify(new oa.Measure(5, new oa.Unit('m', 's')))).to.be('{"type":"oa:measure","value":{"type":"oa:number","value":5},"unit":{"type":"oa:unit","numerator":["m"],"denominator":["s"]}}')
  })
})
