import transformNode from './transformNode';
import readRoot from '../read/readRoot';

export default function transformRoot (root, options) {
	const variables = readRoot(root, options);

	options = {
		...Object(options),
		variables: {
			customMedia: {
				...Object(Object(Object(options).variables).customMedia),
				...Object(variables.customMedia),
			},
			customProperties: {
				...Object(Object(Object(options).variables).customProperties),
				...Object(variables.customProperties),
			},
			customSelectors: {
				...Object(Object(Object(options).variables).customSelectors),
				...Object(variables.customSelectors),
			},
		},
	};

	return transformNode(root, options);
}
