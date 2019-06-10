import transformStringWithCustomProperties from './transform-string-with-custom-properties';

/**
 * Transform Declarations With Custom Properties
 * @param {Object} decl - The Declaration Node being transformed.
 * @param {Object} customProperties - The Custom Properties being used for the transformation.
 * @param {Boolean} preserve - Whether to preserve the property as it is read.
 * @return {Object} The Declaration Node having been transformed.
 */

export default function transformDeclWithCustomProperties (decl, customProperties, preserve) {
	if (isTransformableDecl(decl)) {
		const originalValue = decl.value;
		const modifiedValue = transformStringWithCustomProperties(originalValue, customProperties);

		// conditionally transform values that have changed
		if (originalValue !== modifiedValue) {
			if (preserve) {
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
