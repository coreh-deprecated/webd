/**
 * Default parsers
 */

var parsers =
  { 'webd:date': require('./date')
  , 'webd:measure': require('./measure')
  , 'webd:unit': require('./unit')
  , 'webd:undefined': require('./undefined')
  , 'webd:regexp': require('./regexp')
  }

/**
 * Register a new parsing function
 *
 * @param {String} uri An uri used to uniquely identify this format.
 *                     The protocol of the URI should be either `webd:`,
 *                     `http:` or `https:`. If the protocol is `http:`
 *                     or `https:`, the provided uri MUST point to a valid resource.
 *                     This resource MUST contain a human readable specification
 *                     of the format. URIs with `webd:` protocol are reserved for
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
 * Decode an object from WebD format.
 * This function does not perform JSON parsing.
 * If that's what you need, check out `webd.parse()`.
 *
 * @param {Object} obj The object being decoded
 * @returns {Object} The decoded version of the object
 *
 * @api public
 */

var decode = exports.encode = function(obj) {
  var newObj
  if (obj === null) {
    newObj = null
  } else if (['number', 'string', 'boolean'].indexOf(typeof obj) != -1) {
    newObj = obj
  } else if (typeof obj == 'object') {
    if (typeof obj._ !== 'undefined') {
      var type
      if (typeof obj._ === 'string') {
        type = obj._
      } else if (typeof obj._ === 'object' && typeof obj._.type === 'string') {
        type = obj._.type
      } else {
        throw new Error('Invalid type: ' + obj._)
      }
      var parser = parsers[type]
      if (!parser) {
        throw new Error('Unknown type: ' + type)
      }
      newObj = parser.parse(obj)
    } else {
      if (obj instanceof Array) {
        newObj = []
      } else {
        newObj = {}
      }
      // Copy properties
      for (var property in obj) {
        var newProperty = property
        // Unescape property names made of only underscores
        if (property.match(/^_+$/)) {
          newProperty = property.substr(1)
        }
        newObj[newProperty] = decode(obj[property])
      }
    }
  }
  return newObj
}

/**
 * Encode an object to WebD format (but don't stringify it)
 *
 * @param {Object} obj The object being encoded
 * @returns {Object} The encoded version of the object
 *
 * @api public
 */
var encode = exports.encode = function(obj) {
  var newObj
  if (obj === null) {
    newObj = null
  } else if (['number', 'string', 'boolean'].indexOf(typeof obj) != -1) {
    newObj = obj
  } else if (typeof obj === 'object') {
    if (obj.toWebD && obj.toWebD instanceof Function) {
      newObj = obj.toWebD()
    } else {
      if (obj instanceof Array) {
        newObj = []
      } else {
        newObj = {}
      }
      // Copy properties
      for (var property in obj) {
        var newProperty = property
        // Escape property names made of only underscores
        if (property.match(/^_+$/)) {
          newProperty = '_' + property
        }
        newObj[newProperty] = encode(obj[property])
      }
    }
  } else if (typeof obj === 'undefined') {
    newObj = parsers['webd:undefined'].singleton
  }
  return newObj
}

/**
 * Parse a JSON string representation of an object in WebD format.
 *
 * @param {String, Object} obj The Object being parsed
 * @returns {Object} The result of the parsing
 *
 * @api public
 */

exports.parse = function(obj) {
  if (typeof obj == "string" || obj instanceof String) {
    obj = JSON.parse(obj)
  }

  return decode(obj)
}

/**
 * Stringify an object to a JSON representation of WebD format.
 *
 * @param {Object} obj The Object being stringified
 * @param {String} space The character or sequence of characters used to indent the output.
 *                       (e.g. '  ' or '\t'). If provided, the function will produce pretty
 *                       printed output.
 * @returns {String} The string representing the Object in WebD format
 *
 * @api public
 */

exports.stringify = function(obj, space) {
  return JSON.stringify(encode(obj), null, space)
}

exports.Unit = parsers['webd:unit']
exports.Measure = parsers['webd:measure']
