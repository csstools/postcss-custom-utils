import { parse as valueParser } from 'postcss-values-parser';
import parseMedia from './lib/parseMedia';
import parseSelector from './lib/parseSelector';

/**
* Return Custom Variables read from the Object
* @param {Object} from - The Object being read
* @return {Object} Custom Variables read from the Object
*/

export default function readObject (object) {
	object = Object(object);

	const customMedia = {
		...Object(object.customMedia),
		...Object(object['custom-media']),
	};

	const customSelectors = {
		...Object(object.customSelectors),
		...Object(object['custom-selectors']),
	};

	const customProperties = {
		...Object(object.customProperties),
		...Object(object['custom-properties']),
	};

	const environmentVariables = {
		...Object(object.environmentVariables),
		...Object(object['environment-variables']),
	};

	for (const key in customMedia) {
		customMedia[key] = parseMedia(customMedia[key]);
	}

	for (const key in customProperties) {
		customProperties[key] = valueParser(String(customProperties[key]));
	}

	for (const key in customSelectors) {
		customSelectors[key] = parseSelector(customSelectors[key]);
	}

	for (const key in environmentVariables) {
		environmentVariables[key] = valueParser(String(environmentVariables[key]));
	}

	return {
		customMedia,
		customProperties,
		customSelectors,
		environmentVariables,
	};
}
