import readCustomFromObject from './read-custom-from-object';

/**
 * Returns Custom Media and Custom Properties from a Common JS file
 * @param {String} from - The pathname of the Common JS file being read.
 * @return {Object} The Custom Media and Custom Properties read from the file.
 */

 export default async function readCustomFromCjsFile(from) {
	const object = await import(from);

	return readCustomFromObject(object);
}
