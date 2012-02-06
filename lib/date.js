/**
 * Create a date from an OpenAnything representation.
 * @param {Object} input
 * @returns {Date}
 * @api public
 */
exports.parse = function(input) {
  return new Date(input.value)
}
