import path from 'path';
import readCustomFromCjsFile from './read-custom-from-cjs-file';
import readCustomFromCssFile from './read-custom-from-css-file';
import readCustomFromJsonFile from './read-custom-from-json-file';
import readCustomFromObject from './read-custom-from-object';

/**
 * Return Custom Media and Custom Properties from various sources
 * @param {...Any} sources - The pathname or object being read.
 * @return {Object} The Custom Media and Custom Properties read from the sources.
 */

export default function readCustom(...sources) {
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

		const { customMedia, customProperties, customSelectors } =
			type === 'css' ? await readCustomFromCssFile(from) :
			type === 'js' ? await readCustomFromCjsFile(from) :
			type === 'json' ? await readCustomFromJsonFile(from) :
			await readCustomFromObject(await source);

		return {
			customMedia: Object.assign(Object(resolvedCustom.customMedia), customMedia),
			customProperties: Object.assign(Object(resolvedCustom.customProperties), customProperties),
			customSelectors: Object.assign(Object(resolvedCustom.customSelectors), customSelectors)
		};
	}, {});
}
