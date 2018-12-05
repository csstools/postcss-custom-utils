import { writeFile } from './fs-utils';

/**
 * Write Custom Media and Custom Properties to a ECMAScript Module file
 * @param {String} to - The pathname of the JSON file being written to.
 * @param {Object} custom - The object of Custom Media and Custom Properties written to the file.
 */

export default function writeCustomPropertiesToJsonFile(to, custom) {
	const jsonObject = {};

	if (custom.customMedia) {
		jsonObject['custom-media'] = custom.customMedia
	}

	if (custom.customProperties) {
		jsonObject['custom-properties'] = custom.customProperties
	}

	if (custom.customSelectors) {
		jsonObject['custom-selectors'] = custom.customSelectors
	}

	const jsonContent = JSON.stringify(jsonObject, null, '  ');
	const json = `${jsonContent}\n`;

	return writeFile(to, json);
}
