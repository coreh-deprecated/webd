/**
 * Create a number from an OpenAnything representation
 * @param {Object} input the input
 * @returns {'number'}
 * @api public
 */

exports.parse = function(input) {
  return parseFloat(input.value)
}
