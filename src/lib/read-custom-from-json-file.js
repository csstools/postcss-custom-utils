import readCustomFromObject from './read-custom-from-object';
import { readJSON } from './fs-utils';

/**
 * Return Custom Media and Custom Properties from a JSON file
 * @param {String} from - The pathname of the JSON file being read.
 * @return {Object} The Custom Media and Custom Properties read from the file.
 */

export default async function readCustomFromJsonFile (from) {
	const object = await readJSON(from);

	return readCustomFromObject(object);
}
