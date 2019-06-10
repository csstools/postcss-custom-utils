import path from 'path';
import * as readCustomFromCjsFile from './read-custom-from-cjs-file';
import * as readCustomFromCssFile from './read-custom-from-css-file';
import * as readCustomFromJsonFile from './read-custom-from-json-file';
import readCustomFromObject from './read-custom-from-object';

/**
 * Return Custom Media and Custom Properties from various sources
 * @param {...Any} sources - The pathname or object being read.
 * @return {Object} The Custom Media and Custom Properties read from the sources.
 */

export function async (...sources) {
	return sources.map(source => {
		if (source instanceof Promise) {
			return source;
		} else if (source instanceof Function) {
			return source();
		}

		// read the source as an object
		const opts = source === Object(source) ? source : { from: String(source) };

		// skip objects with Custom Media or Custom Properties
		if (
			opts.customMedia || opts['custom-media'] ||
			opts.customProperties || opts['custom-properties'] ||
			opts.customSelectors || opts['custom-selectors']
		) {
			return opts
		}

		// source pathname
		const from = path.resolve(String(opts.from || ''));

		// type of file being read from
		const type = (opts.type || path.extname(from).slice(1)).toLowerCase();

		return { type, from };
	}).reduce(async (custom, source) => {
		const { type, from } = await source;
		const resolvedCustom = await custom;

		if (type === 'css') {
			const { customMedia, customProperties, customSelectors } = await readCustomFromCssFile.async(from);

			return {
				customMedia: Object.assign(Object(resolvedCustom.customMedia), customMedia),
				customProperties: Object.assign(Object(resolvedCustom.customProperties), customProperties),
				customSelectors: Object.assign(Object(resolvedCustom.customSelectors), customSelectors)
			};
		}

		if (type === 'js') {
			const { customMedia, customProperties, customSelectors } = await readCustomFromCjsFile.async(from);

			return {
				customMedia: Object.assign(Object(resolvedCustom.customMedia), customMedia),
				customProperties: Object.assign(Object(resolvedCustom.customProperties), customProperties),
				customSelectors: Object.assign(Object(resolvedCustom.customSelectors), customSelectors)
			};
		}

		if (type === 'json') {
			const { customMedia, customProperties, customSelectors } = await readCustomFromJsonFile.async(from);

			return {
				customMedia: Object.assign(Object(resolvedCustom.customMedia), customMedia),
				customProperties: Object.assign(Object(resolvedCustom.customProperties), customProperties),
				customSelectors: Object.assign(Object(resolvedCustom.customSelectors), customSelectors)
			};
		}

		const resolvedObject = readCustomFromObject(await source);

		return {
			customMedia: Object.assign(Object(resolvedCustom.customMedia), resolvedObject.customMedia),
			customProperties: Object.assign(Object(resolvedCustom.customProperties), resolvedObject.customProperties),
			customSelectors: Object.assign(Object(resolvedCustom.customSelectors), resolvedObject.customSelectors)
		};
	}, {});
}

export function sync (...sources) {
	sources.map(source => {
		if (source instanceof Function) {
			return source();
		}

		// read the source as an object
		const opts = source === Object(source) ? source : { from: String(source) };

		// skip objects with Custom Media or Custom Properties
		if (
			opts.customMedia || opts['custom-media'] ||
			opts.customProperties || opts['custom-properties'] ||
			opts.customSelectors || opts['custom-selectors']
		) {
			return opts
		}

		// source pathname
		const from = path.resolve(String(opts.from || ''));

		// type of file being read from
		const type = (opts.type || path.extname(from).slice(1)).toLowerCase();

		return { type, from };
	}).reduce((custom, source) => {
		const { type, from } = source;
		const resolvedCustom = custom;

		if (type === 'css') {
			const { customMedia, customProperties, customSelectors } = readCustomFromCssFile.sync(from);

			return {
				customMedia: Object.assign(Object(resolvedCustom.customMedia), customMedia),
				customProperties: Object.assign(Object(resolvedCustom.customProperties), customProperties),
				customSelectors: Object.assign(Object(resolvedCustom.customSelectors), customSelectors)
			};
		}

		if (type === 'js') {
			const { customMedia, customProperties, customSelectors } = readCustomFromCjsFile.sync(from);

			return {
				customMedia: Object.assign(Object(resolvedCustom.customMedia), customMedia),
				customProperties: Object.assign(Object(resolvedCustom.customProperties), customProperties),
				customSelectors: Object.assign(Object(resolvedCustom.customSelectors), customSelectors)
			};
		}

		if (type === 'json') {
			const { customMedia, customProperties, customSelectors } = readCustomFromJsonFile.sync(from);

			return {
				customMedia: Object.assign(Object(resolvedCustom.customMedia), customMedia),
				customProperties: Object.assign(Object(resolvedCustom.customProperties), customProperties),
				customSelectors: Object.assign(Object(resolvedCustom.customSelectors), customSelectors)
			};
		}

		const resolvedObject = readCustomFromObject(source);

		return {
			customMedia: Object.assign(Object(resolvedCustom.customMedia), resolvedObject.customMedia),
			customProperties: Object.assign(Object(resolvedCustom.customProperties), resolvedObject.customProperties),
			customSelectors: Object.assign(Object(resolvedCustom.customSelectors), resolvedObject.customSelectors)
		};
	}, {});
}
