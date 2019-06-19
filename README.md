# PostCSS Custom Utils [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][PostCSS Custom Utils]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Custom Utils] lets you read, write, and transform Custom Variables,
like Custom Properties, Custom Media, Custom Selectors, and Environment Variables.

## API

### read

The `read` method reads custom variables from a variety of sources.

```js
util.read(
  '/path/to/source.css',
  { to: '/path/to/another/source', type: 'css' },
  '/path/to/source/variables.js',
  '/path/to/source/variables.json'
)
```

For more details about configuring individual file sources, see
[readFile](#readFile).

### readCSS

The `readCSS` method returns an object of custom variables.

```js
util.readCSS(root, options) // options = { filename }
```

#### readCSS filename Option

The `readCSS` method accepts a `filename` option to determine the source
mapping for variables.

### readFile

```js
util.readFile(filename, options) // options = { from, type, async }
```

#### readFile Type Option

The `readFile` method accepts a `type` option to control which kind of file is
written — Common JS using `cjs` or `js`, ES Module using `esm` or `mjs`, JSON
using `json`, and css using `css` or anything else. If not specified, the type
will be determined by the file extension, and otherwise it will be `css`.

_Note: There is no convention for writing Environment Variable declarations in CSS, and so those variables will not be read from CSS files._

#### readFile Async Option

The `readFile` method accepts a `async` option to control whether the function
should run asynchronously. By default, all read methods run synchronously.

### readRoot

The `readRoot` method returns an object of custom variables from an AST Root.

```js
util.readRoot(root, options) // options = { features, preserve }
```

_Note: There is no convention for writing Environment Variable declarations in CSS, and so those variables will not be written._

### readRoot Features Option

The `readRoot` method accepts a `features` option to determine which kinds of
custom variables will be read from the AST Root.

The available options are `customMedia`, `customProperties`, `customSelectors`,
and `environmentVariables`.

### readRoot Preserve Option

The `readRoot` method accepts a `preserve` option to determine which kinds of
custom variables will be preserved from the AST Root, rather than removed.

The available options are `customMedia`, `customProperties`, `customSelectors`,
and `environmentVariables`.

### transformCSS

The `transformCSS` method returns a transformed string of CSS using custom
variables.

```js
util.transformCSS(css_string, options) // options = { variables }
```

### transformFile

The `transformFile` method returns a transformed string of CSS from a file
using custom variables.

```js
util.transformFile('path/to/style.css', options) // options = { variables }
```

### transformRoot

The `transformRoot` method returns a transformed AST Root using custom
variables.

```js
util.transformFile('path/to/style.css', options) // options = { variables }
```

### write

The `write` method writes custom variables to a variety of destinations.

```js
util.write(
  '/path/to/destination.css',
  { to: '/path/to/destination', type: 'css' },
  options // options = { async }
)
```

The last argument passed into the `write` method are the options.

#### write Async Option

The `write` method accepts a `async` option to control whether the function
should run asynchronously. By default, all write methods run synchronously.

### writeFile

The `writeFile` method writes custom variables to a file.

```js
util.writeFile(filename, options) // options = { type }
```

#### writeFile Type Option

The `writeCSS` method accepts a `type` option to control which kind of file is
written — Common JS using `cjs` or `js`, ES Module using `esm` or `mjs`, JSON
using `json`, and css using `css` or anything else.

_Note: There is no convention for writing Environment Variable declarations in CSS, and so those variables will not be written to CSS files._

#### writeFile Async Option

The `writeFile` method accepts a `async` option to control whether the function
should run asynchronously. By default, the `writeFile` methods runs
synchronously.

### writeCJS

The `writeCJS` method returns custom variables as an Common JS string of code.

```js
util.writeCJS(root, options)
```

### writeCSS

The `writeCSS` method returns a CSS string of custom variables.

```js
util.writeRoot(root, options) // options = { insert }
```

_Note: There is no convention for writing Environment Variable declarations in CSS, and so those variables will not be written._

#### writeCSS Insert Option

The `writeCSS` method accepts a `insert` option to control whether the custom
variables are inserted `before` or `after` the other CSS.

### writeESM

The `writeESM` method returns custom variables as an ES Module string of code.

```js
util.writeESM(root, options)
```

### writeJSON

The `writeJSON` method returns custom variables as a JSON string.

```js
util.writeJSON(root, options)
```

### writeRoot

The `writeRoot` method returns an Root object with inserted custom variables.

```js
util.writeRoot(root, options) // options = { insert }
```

_Note: There is no convention for writing Environment Variable declarations in CSS, and so those variables will not be written._

#### writeRoot Insert Option

The `writeRoot` method accepts a `insert` option to control whether the custom
variables are inserted `before` or `after` the other CSS.

[cli-img]: https://img.shields.io/travis/csstools/postcss-custom-utils/master.svg
[cli-url]: https://travis-ci.org/csstools/postcss-custom-utils
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-custom-utils.svg
[npm-url]: https://www.npmjs.com/package/postcss-custom-utils

[PostCSS Custom Utils]: https://github.com/csstools/postcss-custom-utils
