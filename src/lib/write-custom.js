import path from 'path';
import * as writeCustomToCjsFile from './write-custom-to-cjs-file';
import * as writeCustomToCssFile from './write-custom-to-css-file';
import * as writeCustomToEsmFile from './write-custom-to-esm-file';
import * as writeCustomToJsonFile from './write-custom-to-json-file';

/**
 * Write Custom Media and Custom Properties to various destinations
 * @param {Object} custom - The object of Custom Media and Custom Properties written to the pathname or object.
 * @param {...Any} destinations - The pathname or object being written to.
 */

export function async (custom, ...destinations) {
	return Promise.all(destinations.map(destination => {
		if (destination instanceof Function) {
			return Promise.resolve(
				destination(defaultCustomToJSON(custom))
			);
		} else {
			// read the destination as an object
			const opts = destination === Object(destination) ? destination : { to: String(destination) };

			// transformer for Custom Media and Custom Properties into a JSON-compatible object
			const toJSON = opts.toJSON || defaultCustomToJSON;

			// destination pathname
			const to = path.resolve(String(opts.to || ''));

			// type of file being written to
			const type = (opts.type || (opts.to ? path.extname(opts.to).slice(1) : '')).toLowerCase();

			// transformed Custom Media and Custom Properties
			const customJSON = toJSON(custom);

			if (type === 'css') {
				return writeCustomToCssFile.async(to, customJSON);
			}

			if (type === 'js') {
				return writeCustomToCjsFile.async(to, customJSON);
			}

			if (type === 'json') {
				return writeCustomToJsonFile.async(to, customJSON);
			}

			if (type === 'mjs') {
				return writeCustomToEsmFile.async(to, customJSON);
			}

			// write directly to an object as customMedia
			if (customJSON.customMedia) {
				opts.customMedia = Object.assign({}, customJSON.customMedia);
			}

			// write directly to an object as customProperties
			if (customJSON.customProperties) {
				opts.customProperties = Object.assign({}, customJSON.customProperties);
			}

			// write directly to an object as customSelectors
			if (customJSON.customSelectors) {
				opts.customSelectors = Object.assign({}, customJSON.customSelectors);
			}

			return Promise.resolve();
		}
	})).then(() => {});
}

export function sync (custom, ...destinations) {
	destinations.map(destination => {
		if (destination instanceof Function) {
			return destination(defaultCustomToJSON(custom));
		} else {
			// read the destination as an object
			const opts = destination === Object(destination) ? destination : { to: String(destination) };

			// transformer for Custom Media and Custom Properties into a JSON-compatible object
			const toJSON = opts.toJSON || defaultCustomToJSON;

			// destination pathname
			const to = path.resolve(String(opts.to || ''));

			// type of file being written to
			const type = (opts.type || (opts.to ? path.extname(opts.to).slice(1) : '')).toLowerCase();

			// transformed Custom Media and Custom Properties
			const customJSON = toJSON(custom);

			if (type === 'css') {
				return writeCustomToCssFile.sync(to, customJSON);
			}

			if (type === 'js') {
				return writeCustomToCjsFile.sync(to, customJSON);
			}

			if (type === 'json') {
				return writeCustomToJsonFile.sync(to, customJSON);
			}

			if (type === 'mjs') {
				return writeCustomToEsmFile.sync(to, customJSON);
			}

			// write directly to an object as customMedia
			if (customJSON.customMedia) {
				opts.customMedia = Object.assign({}, customJSON.customMedia);
			}

			// write directly to an object as customProperties
			if (customJSON.customProperties) {
				opts.customProperties = Object.assign({}, customJSON.customProperties);
			}

			// write directly to an object as customSelectors
			if (customJSON.customSelectors) {
				opts.customSelectors = Object.assign({}, customJSON.customSelectors);
			}
		}
	});
}

/* Helper utilities
/* ========================================================================== */

function defaultCustomToJSON (custom) {
	const json = {};

	if (Object(custom.customMedia) === custom.customMedia) {
		json.customMedia = stringifyKeys(custom.customMedia);
	}

	if (Object(custom.customProperties) === custom.customProperties) {
		json.customProperties = stringifyKeys(custom.customProperties);
	}

	if (Object(custom.customSelectors) === custom.customSelectors) {
		json.customSelectors = stringifyKeys(custom.customSelectors);
	}

	return json;
}

function stringifyKeys (object) {
	const result = {};

	Object.keys(object).forEach(
		key => {
			result[key] = String(object[key]);
		}
	);

	return result;
}
