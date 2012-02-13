# What is WebD

**WebD** is a convention on how to represent a wide variety of data types in
JSON. It's also a library with the same name for easily encoding and decoding
information under this convention.

# Why WebD?

Out of the box, JSON offers native support for the following
data types:

- `null`
- numbers
- strings
- `true` and `false`
- arrays
- objects

JSON's success can be largely attributed to its simplicity and
open-endedness. (After all, these six basic data types are enough to
represent all the World's information)

From the ability to encode just about anything you want in any way you
want using JSON objects, arises an interesting problem: There is not
a single way of representing types that are not native in JSON. As an
example, lets take human names. At first, you might consider that a
human name is just a string. You could for sure encode a name in JSON
simply as:

    "John Doe"

However, if you wanted to have easier access to the individual portions
of the name, you could use an object like:

    { "first": "John"
    , "last": "Doe"
    }

So far so good. However, the same object could be written, by another
person, as:

    { "given": "John"
    , "family": "Doe"
    }

The lack of conventions on how to represent different data types
creates interoperability issues. If you want to use two different 
APIs, and they have incompatible representations of the same data types,
it's on your hands as a developer to bridge their representations. That
might sound like something simple, as it usually is, but keep this in
mind: This is the sole reason you can't reuse the exact same code to read,
for instance, the information about a Facebook user and a Twitter user.

WebD solves this problem by providing out-of-the-box a comprehensive 
collection of ready-to-use data types for representing user information,
location information, measurements of physical quantities, events,
companies, articles, books, status updates, and just about anything 
you can imagine. WebD is also extensible, so that you can add your own
custom data type representations to it.

Another problem that arises when encoding non-native data
as JSON is that the data type is usually not explicit in the representation.
Take dates as an example: The native `Date` object in JavaScript defines on 
its prototype a `toJSON()` method. When you use `JSON.stringify()` on a date,
this method is called internally by the encoder, and you have something
like `"2012-02-12T19:33:05.823Z"` as a result. When you parse this representation 
on another end, you get a string as a result. To fix this you must know
beforehand where to expect Date objects and then manually parse them.

WebD solves this problem by including the type information explictly on
the encoded data. The same date as above, when encoded in WebD, is
represented as:

    { "_": "webd:date"
    , "value": "2012-02-12T19:33:05.823Z"
    }

## TL;DR

WebD allows for easier interoperability by:

- Providing a comprehensive collection of ready-to-use data types out-of-the-box.
- Encoding data type information explicitly along with the representation.

WebD is also fairly easy to extend.

# What isn't WebD

- WebD is not an exercise in futility or in masochism like XML schemas.
- WebD is not an attempt to bring XML schemas to JSON.

# What is WebD good for

- Serializing and deserializing data types that are not native in JSON;
- Creating APIs that are self-describing and interoperable;
- Transporting information between a Web page and it's workers;
- Transporting information via WebSockets;
- Representing user data for HTML5 drag-and-drop;
- Storing data in document-based stores like couchdb and mongodb.

# How WebD works

WebD can be considered a syntatic subset of JSON, but a semantic
superset of it. This means two things:

- Every WebD document is valid JSON, but not every JSON document is valid WebD.
- WebD representations can translate into data types that are not "possible" 
  to represent in JSON "natively".

![Syntax: slightly more restrict, but fully compatible with existing JSON parsers - Semantics: represents natively a wide variety of data types, extensible](https://raw.github.com/Coreh/webd/master/docs/venn.png)

The latter is possible because we assign a special meaning to the `"_"` property
of JSON objects: In WebD this property is used to state a data type.

Take the date example from a few sections before:

    { "_": "webd:date"
    , "value": "2012-02-12T19:33:05.823Z"
    }

The `"_"` property of the object states that its data type is
`"webd:date"`: A native `Date` object. The WebD library can leverage this
information during parsing to reconstruct the data properly.

If present, `"_"` properties are required to be either strings themselves or 
objects containing a `"type"` property that is a string.

The value of this string must be either `webd:` followed by something for native
WebD types (e.g. `webd:date`), or a URI pointing to a human readable specification of the
format for non-native WebD types. The `webd:` prefix can be thought of as
a special URI protocol reserved by WebD. To avoid the verbosity of XML 
DTDs, the `http://` part of the URI may be ommited for custom data types.

## Custom data type example

If someone, say `company.com` wanted to define a new data type called
`funky`, it could be represented, for example as:

    { "_": "company.com/funky"
    , "foo": "bar"
    , "xyz": "abc"
    }

Or maybe:

    { "_": "funky.company.com"
    , "foo": "bar"
    , "xyz": "abc"
    }
Or even:

    { "_": "api.company.com/formats/funky_format_spec"
    , "foo": "bar"
    , "xyz": "abc"
    }

As long as the URI defined by `"_"` pointed to a valid, human readable
specification on how to read the `funky` format.

## Escaping of the `"_"` property

Since WebD assigns a special meaning to the `"_"` property, JSON objects
containing this property with any value that is not a type definition
are not valid WebD objects. (That is, in fact, why WebD can be
considered a syntatic subset of JSON)

The quite unusual property name `"_"` was chosen specifically to minimize
the impact of this restriction. However, objects with custom `"_"` 
properties can still be represented in WebD by escaping the property
with the addition of another `_`.

The perfectly valid JSON object `{ "_": "foo" }`, when encoded in WebD,
becomes:

    { "__": "foo" }

Likewise, the JSON object `{ "__": "foo" }`, when encoded in WebD,
becomes:

    { "___": "foo" }

Since you can always add another `_` to escape the property, all JSON
objects can actually be represented in WebD, albeit in a slightly
different manner. That's a proof that WebD is a semantic superset 
of JSON.

**Important:** The escaping (an unescaping) is handled automatically by the library. 
There's no need to do it manually.

# Using WebD (The library)

The WebD library provides an interface similar to the native JSON parser in JavaScript:

| Function                           | Meaning
|:-----------------------------------|:--------------------------------------------
| `webd.stringify(obj, indent)`      | Generate a WebD representation of the object in string format, optionally indenting it with the character provided.
| `webd.parse(str)`                  | Parse this WebD representation in string format and return the result.

It also provides functions to simply encode and decode objects to and
from their WebD representations, without parsing or stringifying.

| Function                | Meaning
|:------------------------|:--------------------------------------------
| `webd.encode(obj)`      | Encode the object to a WebD representation
| `webd.decode(obj)`      | Decode the object from an WebD representation

## In a CommonJS environment

    var webd = require('webd')

## In a browser environment

*Coming soon*
