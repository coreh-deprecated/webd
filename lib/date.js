/**
 * Create a date from a WebD representation.
 * @param {Object} input
 * @returns {Date}
 * @api public
 */
exports.parse = function(input) {
  return new Date(input.value)
}

/**
 * Convert a Date to a WebD representation
 * @returns {Object}
 * @api public
 */
Date.prototype.toWebD = function() {
  return { _: 'webd:date'
         , value: this.toJSON()
         }
}
