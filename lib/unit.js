/**
 * Represents a Unit (as in, a quantity used for measurement, like meters, seconds,
 * kilograms).
 *
 * The unit might be simple (e.g. meters) or compound (e.g. Meters per Second)
 *
 * Objects created by this function should be considered immutable.
 *
 * @param {Array, String} numerator The numerator of the unit
 * @param {Array, String} denominator The denominator of the unit
 * @api public
 */

var Unit = function(numerator, denominator) {
  if (typeof numerator === 'undefined') {
    numerator = []
  } else if (typeof numerator == 'string' || numerator instanceof String) {
    numerator = [numerator]
  }
  if (typeof denominator === 'undefined') {
    denominator = []
  } else if (typeof denominator == 'string' || denominator instanceof String) {
    denominator = [denominator]
  }

  this.numerator = numerator
  this.denominator = denominator
  this.simplify()
  this.normalize()
}

/**
 * Simplify the unit
 *
 * e.g. m*s/s -> m
 *
 * @api private
 */

Unit.prototype.simplify = function() {
  var done
  do {
    done = true
    for (var i = 0; i < this.numerator.length; i++) {
      var j = this.denominator.indexOf(this.numerator[i]) 
      if (j != -1) {
        this.numerator.splice(i, 1)
        this.denominator.splice(j, 1)
        done = false;
        break;
      }
    }
  } while (!done)
}

/**
 * Normalize a unit. A normalized unit is one with numerators
 * and denominators in alphabetical order.
 *
 * @api private
 */

Unit.prototype.normalize = function() {
  this.numerator.sort()
  this.denominator.sort()
}

/**
 * Compare this against other unit
 *
 * @param {Unit} that The other unit
 * @returns {Boolean} true if equal, false if not equal
 *
 * @api public
 */

Unit.prototype.equals = function(that) {
  if (that.numerator.length != this.numerator.length) return false
  if (that.denominator.length != this.denominator.length) return false
  for (var i = 0; i < this.numerator.length; i++) {
    if (that.numerator[i] != this.numerator[i]) return false
  }
  for (var i = 0; i < this.denominator.length; i++) {
    if (that.denominator[i] != this.denominator[i]) return false
  }
  return true;
}

/**
 * Return the OpenAnything representation of this object
 *
 * @returns {Object} OpenAnything representation
 * @api public
 */

Unit.prototype.toOA = function() {
  var result =  { _: 'oa:unit' } 
  if (this.numerator.length > 0) {
    result.numerator = this.numerator
  }
  if (this.denominator.length > 0) {
    result.denominator = this.denominator
  }
  return result
}

/**
 * Convert the unit to a string
 * @returns {String}
 * @api public
 */

Unit.prototype.toString = function() {
  if (this.denominator.length > 0) {
    if (this.numerator.length > 0) {
      return this.numerator.join('*') + '/' + this.denominator.join('/')
    } else {
      return '1/' + this.denominator.join('/')
    }
  } else {
    if (this.numerator.length > 0) {
      return this.numerator.join('*')
    } else {
      return '1'
    }
  }
}

/**
 * Multiplies this unit by another unit
 * @param {Unit} that Other unit
 * @api public
 */

Unit.prototype.multiply = function(that) {
  return new Unit(this.numerator.concat(that.numerator), this.denominator.concat(that.denominator));
}

/**
 * Creates an Unit object from an OpenAnything representation
 * @param {Object} input The input
 * @returns {Unit} The resulting unit
 * @api public
 */

Unit.parse = function(input) {
  return new Unit(input.numerator, input.denominator)
}

module.exports = Unit
