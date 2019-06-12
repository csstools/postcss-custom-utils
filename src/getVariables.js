export default function getVariables (options) {
	const variables = Object(Object(options).variables);

	return {
		customMedia: Object(variables.customMedia),
		customProperties: Object(variables.customProperties),
		customSelectors: Object(variables.customSelectors),
	};
}
