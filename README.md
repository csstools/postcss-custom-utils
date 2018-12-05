# PostCSS Custom Utils [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][PostCSS Custom Utils]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Custom Utils] lets you read, write, and transform Custom Media and
Custom Properties from almost anywhere.

### readCustom

The `readCustom` function reads Custom Media and Custom Properties from various
sources, including Objects, Promises and Functions returning an Object, and
also CSS, JS, and JSON files.

```js
await readCustom(...sources)
```

### readCustomFromCjsFile

The `readCustomFromCjsFile` function returns Custom Media and Custom Properties
from a Common JS file.

```js
await readCustomFromCjsFile('/path/to/file.js');
```

### readCustomFromCssFile

The `readCustomFromCssFile` function returns Custom Media and Custom Properties
from a CSS file.

```js
await readCustomFromCssFile('/path/to/file.css');
```

### readCustomFromJsonFile

The `readCustomFromJsonFile` function returns Custom Media and Custom
Properties from a JSON file.

```js
await readCustomFromJsonFile('/path/to/file.json');
```

### readCustomFromObject

The `readCustomFromObject` function returns Custom Media and Custom Properties
from an Object.

```js
readCustomFromObject({ customMedia, customProperties, customSelectors });
```

### readCustomFromRoot

The `readCustomFromRoot` function return Custom Media and Custom Properties
from a CSS Root AST.

```js
readCustomFromRoot({ nodes: [] });
```

### transformRootWithCustom

```js
transformRootWithCustom(root, { customMedia, customProperties, customSelectors });
```

### transformRootWithCustomMedia

```js
transformRootWithCustomMedia(root, customMedia);
```

### transformRootWithCustomProperties

```js
transformRootWithCustomProperties(root, customProperties);
```

### transformRootWithCustomSelectors

```js
transformRootWithCustomSelectors(root, customSelectors);
```

### transformStringWithCustomMedia

The `transformStringWithCustomMedia` function returns a Media Query parameter
string transformed with Custom Media.

```js
transformStringWithCustomMedia('(--custom-media)', customMedia);
```

### transformStringWithCustomProperties

The `transformStringWithCustomProperties` function returns a Declaration Value
string transformed with Custom Properties.

```js
transformStringWithCustomProperties('var(--custom-property)', customProperties);
```

### transformStringWithCustomSelectors

The `transformStringWithCustomSelectors` function returns a Selector Value
string transformed with Custom Selectors.

```js
transformStringWithCustomSelectors(':--any-heading + p', customSelectors);
```

### writeCustom

The `writeCustomToJsonFile` function writes Custom Media and Custom Properties
to various sources, including Objects, Functions, and also CSS and JS files,
ECMAScript Modules compatible JS files, and JSON files.

```js
await writeCustom({ customMedia, customProperties, customSelectors }, ...destinations);
```

### writeCustomToCjsFile

The `writeCustomToJsonFile` function writes Custom Media and Custom Properties
to a Common JS file.

```js
await writeCustomToCjsFile('/path/to/file.js', { customMedia, customProperties, customSelectors });
```

### writeCustomToCssFile

The `writeCustomToJsonFile` function writes Custom Media and Custom Properties
to a CSS file.

```js
await writeCustomToCssFile('/path/to/file.css', { customMedia, customProperties, customSelectors });
```

### writeCustomToEsmFile

The `writeCustomToJsonFile` function writes Custom Media and Custom Properties
to a ECMAScript Modules compatible JS file.

```js
await writeCustomToEsmFile('/path/to/file.mjs', { customMedia, customProperties, customSelectors });
```

### writeCustomToJsonFile

The `writeCustomToJsonFile` function writes Custom Media and Custom Properties
to a JSON file.

```js
await writeCustomToJsonFile('/path/to/file.json', { customMedia, customProperties, customSelectors });
```

[cli-img]: https://img.shields.io/travis/csstools/postcss-custom-utils/master.svg
[cli-url]: https://travis-ci.org/csstools/postcss-custom-utils
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-custom-utils.svg
[npm-url]: https://www.npmjs.com/package/postcss-custom-utils

[PostCSS Custom Utils]: https://github.com/csstools/postcss-custom-utils
