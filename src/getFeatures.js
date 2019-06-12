import { isObject, isString, isVoid } from './is';

export default function getFeatures (options) {
	options = Object(options);

	return isVoid(options.features)
		? { customMedia: true, customProperties: true, customSelectors: true }
	: isObject(options.features)
		? formatObject(options.features)
	: formatObject([].concat(
		isString(options.features)
			? options.features.split(/[^\w-]/)
		: options.features
	).reduce(
		(features, feature) => {
			features[feature] = true;

			return features;
		},
		{}
	));
}

function formatObject (object) {
	return Object.keys(object).reduce(
		(formatted, name) => {
			const formattedName = name.replace(/-[a-z]/, $0 => $0[1].toUpperCase());

			formatted[formattedName] = object[name];

			return formatted;
		},
		{}
	);
}
