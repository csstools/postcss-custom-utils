import getFeatures from '../getFeatures';
import getVariables from '../getVariables';

// return custom variables as a JSON string
export default function writeJSON (options) {
	const features = getFeatures(options);
	const { customMedia, customProperties, customSelectors, environmentVariables } = getVariables(options);

	const jsonObject = {};

	if (features.customMedia) {
		jsonObject['custom-media'] = escapeObjectForJS(customMedia);
	}

	if (features.customProperties) {
		jsonObject['custom-properties'] = escapeObjectForJS(customProperties);
	}

	if (features.customSelectors) {
		jsonObject['custom-selectors'] = escapeObjectForJS(customSelectors);
	}

	if (features.environmentVariables) {
		jsonObject['environment-variables'] = escapeObjectForJS(environmentVariables);
	}

	const jsonContents = JSON.stringify(jsonObject, null, '  ');

	const json = `${jsonContents}\n`;

	return json;
}

function escapeObjectForJS (object) {
	return Object.keys(Object(object)).reduce(
		(escaped, name) => {
			escaped[name] = String(object[name]);

			return escaped;
		},
		{}
	)
}
