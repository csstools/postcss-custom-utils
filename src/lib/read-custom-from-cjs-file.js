import readCustomFromObject from './read-custom-from-object';
import cjs from './cjs';

/**
 * Returns Custom Media and Custom Properties from a Common JS file
 * @param {String} from - The pathname of the Common JS file being read.
 * @return {Object} The Custom Media and Custom Properties read from the file.
 */

export async function async (from) {
	const object = await import(from);

	return readCustomFromObject(object);
}

export function sync (from) {
	const object = cjs.require(from);

	return readCustomFromObject(object);
}
