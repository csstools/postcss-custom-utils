import getOptions from '../getOptions';
import transformStringWithEnvironmentVariables from './transformStringWithEnvironmentVariables';
import transformWalk from './transformNode';

// transform declarations with environment variables
export default function transformNodeWithCustomProperties (node, options) {
	const { features, preserve } = getOptions(options);

	if (features.environmentVariables) {
		if (isTransformableAtrule(node)) {
			const originalValue = node.params;
			const modifiedValue = transformStringWithEnvironmentVariables(originalValue, options);

			// conditionally transform values that have changed
			if (originalValue !== modifiedValue) {
				if (preserve.environmentVariables) {
					transformWalk(
						node.cloneBefore({ params: modifiedValue }),
						options
					);
				} else {
					node.params = modifiedValue;
				}
			}
		} else if (isTransformableDecl(node)) {
			const originalValue = node.value;
			const modifiedValue = transformStringWithEnvironmentVariables(originalValue, options);

			// conditionally transform values that have changed
			if (originalValue !== modifiedValue) {
				if (preserve.environmentVariables) {
					node.cloneBefore({ value: modifiedValue });
				} else {
					node.value = modifiedValue;
				}
			}
		}
	}


	return node;
}

// whether the declaration should be potentially transformed
function isTransformableDecl (decl) {
	return decl.type === 'decl' && environmentVariablesRegExp.test(decl.value);
}

// whether the atrule should be potentially transformed
function isTransformableAtrule (atrule) {
	return atrule.type === 'atrule' && environmentVariablesRegExp.test(atrule.params);
}

// match environment variable inclusions
const environmentVariablesRegExp = /(^|[^\w-])env\([\W\w]+\)/;
