import { isFunction, isObject, isPromise, isString } from './is';
import readFile from './read/readFile';
import readObject from './read/readObject';
import readRoot from './read/readRoot';

/**
* Return Custom Variables read from a variety of sources
* @param {...*} sources
* @return {Object} Custom Variables read from the sources
*/

export default function read (...sources) {
	const promises = [];
	const variables = {};

	function assign (value) {
		Object.assign(variables, value);
	}

	sources.forEach(source => {
		// Read Custom Variables from the resolved value of a Promise
		if (isPromise(source)) {
			return promises.push(
				Promise.resolve(source).then(assign)
			);
		}

		// Read Custom Variables from the return value of a Function
		if (isFunction(source)) {
			return assign(source());
		}

		// Transform a String source into an Object
		if (!isObject(source)) {
			source = { from: source };
		}

		const { from, ...options } = source;

		// Read Custom Variables from an AST Root
		if (options.type === 'ast' || options.type === 'root') {
			return assign(
				readRoot(from, options)
			);
		}

		// Read Custom Variables from a File
		if (isString(from)) {
			return options.async
				? promises.push(
					readFile(from, options).then(assign)
				)
			: assign(
				readFile(from, options)
			);
		}

		// Read Custom Variables from an Object
		assign(
			readObject(options)
		);
	});

	const promise = Promise.all(promises).then(() => variables);

	return Object.defineProperty({ ...variables }, 'then', {
		value: promise.then.bind(promise)
	});
}
