import getOptions from '../getOptions';
import transformStringWithCustomProperties from './transformStringWithCustomProperties';

// transform declarations with custom properties
export default function transformNodeWithCustomProperties (decl, options) {
	const { features, preserve } = getOptions(options);

	if (features.customProperties && isTransformableDecl(decl)) {
		const originalValue = decl.value;
		const modifiedValue = transformStringWithCustomProperties(originalValue, options);

		// conditionally transform values that have changed
		if (originalValue !== modifiedValue) {
			if (preserve.customProperties) {
				decl.cloneBefore({ value: modifiedValue });
			} else {
				decl.value = modifiedValue;
			}
		}
	}

	return decl;
}

// whether the declaration should be potentially transformed
function isTransformableDecl (decl) {
	return !customPropertyRegExp.test(decl.prop) && customPropertiesRegExp.test(decl.value);
}

// match custom properties
const customPropertyRegExp = /^--[A-z][\w-]*$/;

// match custom property inclusions
const customPropertiesRegExp = /(^|[^\w-])var\([\W\w]+\)/;
