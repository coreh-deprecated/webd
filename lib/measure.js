/**
 * Module dependencies
 */

var number = require('./number')
  , unit = require('./unit')

/**
 * Represents a measurement. A measurement is defined as both a number
 * and a unit.
 *
 * Objects returned by this method should be considered immutable.
 *
 * @param {Number} value The numeric value of the measurement
 * @param {Unit} unit the unit of the measurement
 * @api public
 */
var Measure = function(value, unit) {
  this.value = value
  this.unit = unit
}

/**
 * Adds this measurement to another one. To add two measurements
 * both need to be of the same unit.
 *
 * @param {Measurement} that Other measurement
 * @returns {Measurement} result
 * @api public
 */
Measure.prototype.add = function(that) {
  if (!this.unit.equals(that.unit)) {
    return null
  }
  return new Measure(this.value + that.value, this.unit)
}

/**
 * Multiply this measurement by another one.
 * @param {Measurement} that Other measurement
 * @returns {Measurement} the result
 * @api public
 */
Measure.prototype.multiply = function(that) {
  return new Measure(this.value * that.value, this.unit.multiply(that.unit))
}

/**
 * Convert this measurement to a string.
 * @returns {String}
 * @api public
 */
Measure.prototype.toString = function() {
  var unit = this.unit.toString()
  unit = unit.replace(/^1/, '') // Handle units without numerators
  return this.value + unit;
}

/**
 * Convert this measurement to an OpenAnything representation
 * @returns {Object}
 * @api public
 */
Measure.prototype.toOA = function() {
  return { type: 'oa:measure'
         , value: { type: 'oa:number'
                  , value: this.value
                  }
         , unit: this.unit.toOA()
         }
}

/**
 * Create an Measure object from an OpenAnything representation
 * @param {Object} input the input
 * @returns {Measure} 
 * @api public
 */
Measure.parse = function(input) {
  return new Measure(number.parse(input.value), unit.parse(input.unit))
}

module.exports = Measure
