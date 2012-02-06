/**
 * Create a date from an OpenAnything representation.
 * @param {Object} input
 * @returns {Date}
 * @api public
 */
exports.parse = function(input) {
  return new Date(input.value)
}

/**
 * Convert a Date to an OpenAnything representation
 * @returns {Object}
 * @api public
 */
Date.prototype.toOA = function() {
  return { _: 'oa:date'
         , value: this.toJSON()
         }
}
