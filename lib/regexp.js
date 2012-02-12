/**
 * Create a regular expression from a WebD representation.
 * @param {Object} input
 * @returns {RegExp}
 * @api public
 */
exports.parse = function(input) {
  return new RegExp(input.value)
}

/**
 * Convert a regular expression to a WebD representation
 * @returns {Object}
 * @api public
 */
RegExp.prototype.toWebD = function() {
  return { _: 'webd:regexp'
         , value: this.source
         }
}

