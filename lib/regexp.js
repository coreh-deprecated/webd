/**
 * Create a regular expression from an OpenAnything representation.
 * @param {Object} input
 * @returns {RegExp}
 * @api public
 */
exports.parse = function(input) {
  return new RegExp(input.value)
}

/**
 * Convert a regular expression to an OpenAnything representation
 * @returns {Object}
 * @api public
 */
RegExp.prototype.toOA = function() {
  return { _: 'oa:regexp'
         , value: this.source
         }
}

