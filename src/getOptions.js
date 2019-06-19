import { isObject, isString, isVoid } from './is';

export default function getOptions (options) {
	options = { ...Object(options) };

	options.features = isVoid(options.features)
		? { customMedia: true, customProperties: true, customSelectors: true, environmentVariables: true }
	: isObject(options.features)
		? formatFeatureObject(options.features)
	: formatFeatureObject([].concat(
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

	options.preserve = isVoid(options.preserve) || options.preserve === true
		? { customMedia: true, customProperties: true, customSelectors: true, environmentVariables: true }
	: isObject(options.preserve)
		? formatFeatureObject(options.preserve)
	: formatFeatureObject([].concat(
		isString(options.preserve)
			? options.preserve.split(/[^\w-]/)
		: options.preserve
	).reduce(
		(preserves, preserve) => {
			preserves[preserve] = true;

			return preserves;
		},
		{}
	));

	options.variables = {
		customMedia: Object(Object(options.variables).customMedia),
		customProperties: Object(Object(options.variables).customProperties),
		customSelectors: Object(Object(options.variables).customSelectors),
		environmentVariables: Object(Object(options.variables).environmentVariables),
	};

	return options;
}

function formatFeatureObject (object) {
	return Object.keys(object).reduce(
		(formatted, name) => {
			const formattedName = name.replace(/-[a-z]/, $0 => $0[1].toUpperCase());

			formatted[formattedName] = Boolean(object[name]);

			return formatted;
		},
		{}
	);
}
