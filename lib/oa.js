/**
 * Default parsers
 */

var parsers =
  { 'oa:date': require('./date')
  , 'oa:measure': require('./measure')
  , 'oa:unit': require('./unit')
  }

/**
 * Register a new parsing function
 *
 * @param {String} uri An uri used to uniquely identify this format.
 *                     The protocol of the URI should be either `oa:`,
 *                     `http:` or `https:`. If the protocol is `http:`
 *                     or `https:`, the provided uri MUST point to a valid resource.
 *                     This resource MUST contain a human readable specification
 *                     of the format. URIs with `oa:` protocol are reserved for
 *                     standard formats, but are still useful if you want to
 *                     specify a custom parser.
 *
 * @param {Function} parseFunction The function used to parse this format. It takes a
 *                                 single argument, the object being parsed, and is
 *                                 expected to return the result of the parsing.
 *
 * @api public
 */

exports.register = function(uri, parseFunction) {
  parsers[uri] = parseFunction
}

/**
 * Parse an Object in OpenAnything format.
 *
 * @param {String, Object} obj The Object being parsed
 * @returns {Object} The result of the parsing
 * @api public
 */

exports.parse = function(obj) {
  if (typeof obj == "string" || obj instanceof String) {
    obj = JSON.parse(obj)
  }

  if (!obj._ || !obj._.match(/^oa\:|^https?\:\\\\/)) {
    throw new Error('Invalid type')
  }

  var parser = parsers[obj._]
  if (!parser) {
    throw new Error('Unknown type')
  }

  return parser.parse(obj)
}

/**
 * Stringify an object to OpenAnything format.
 *
 * @param {Object} obj The Object being stringified
 * @returns {String} The string representing the Object in OpenAnything format
 * @api public
 */

exports.stringify = function(obj) {
  var result
  if (obj.toOA) {
    result = obj.toOA()
  } else {
    result = obj
  }
  return JSON.stringify(result)
}

exports.Unit = parsers['oa:unit']
exports.Measure = parsers['oa:measure']
