import { isFunction, isObject, isString } from './is';
import writeFile from './write/writeFile';
import writeRoot from './write/writeRoot';

/**
* Write Custom Variables to a variety of destinations
* @param {...*} destinations
* @param {Object} options
*/

export default function write (...destinations) {
	const options = Object(destinations.pop());
	const promises = [];

	destinations.forEach(destination => {
		// Pass Custom Variables into a Function
		if (isFunction(destination)) {
			return destination(options.variables, options);
		}

		// Transform a String source into an Object
		if (!isObject(destination)) {
			destination = { to: destination };
		}

		const { to, ...moreOptions } = {
			...options,
			...destination
		};

		// Write Custom Variables to an AST Root
		if (options.type === 'ast' || options.type === 'root') {
			return writeRoot(to, moreOptions);
		}

		// Write Custom Variables to a File
		if (isString(to)) {
			return moreOptions.async
				? promises.push(
					writeFile(to, moreOptions)
				)
			: writeFile(to, moreOptions);
		}

		// Assign Custom Variables to an Object
		Object.assign(destination, moreOptions.variables);
	});

	return Promise.all(promises).then(() => {});
}
