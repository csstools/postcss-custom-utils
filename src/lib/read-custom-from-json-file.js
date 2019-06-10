import readCustomFromObject from './read-custom-from-object';
import { readJson, readJsonSync } from './fs-utils';

/**
 * Return Custom Media and Custom Properties from a JSON file
 * @param {String} from - The pathname of the JSON file being read.
 * @return {Object} The Custom Media and Custom Properties read from the file.
 */

export async function async (from) {
	const object = await readJson(from);

	return readCustomFromObject(object);
}

export function sync (from) {
	const object = readJsonSync(from);

	return readCustomFromObject(object);
}
