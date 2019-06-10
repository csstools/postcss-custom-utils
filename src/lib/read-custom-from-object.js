import { parse as valueParser } from 'postcss-values-parser';
import parseCustomMediaFromString from './parse-custom-media-from-string';
import parseSelector from './parse-selector';

/**
 * Return Customs from an Object
 * @param {Object} from - The Object being read.
 * @return {Object} The Customs read from the Object.
 */

export default function readCustomFromObject (object) {
	const customMedia = Object.assign(
		{},
		Object(object).customMedia,
		Object(object)['custom-media']
	);
	const customProperties = Object.assign(
		{},
		Object(object).customProperties,
		Object(object)['custom-properties']
	);
	const customSelectors = Object.assign(
		{},
		Object(object).customSelectors,
		Object(object)['custom-selectors']
	);

	for (const key in customMedia) {
		customMedia[key] = parseCustomMediaFromString(customMedia[key]);
	}

	for (const key in customProperties) {
		customProperties[key] = valueParser(String(customProperties[key])).nodes;
	}

	for (const key in customSelectors) {
		customSelectors[key] = parseSelector(customSelectors[key]);
	}

	return { customMedia, customProperties, customSelectors };
}
