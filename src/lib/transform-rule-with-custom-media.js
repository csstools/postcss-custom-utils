import transformStringWithCustomMedia from './transform-string-with-custom-media';

/**
 * Transform a Rule With Custom Media
 * @param {Object} rule - The Rule Node being transformed.
 * @param {Object} customMedia - The Custom Media being used for the transformation.
 * @param {Boolean} preserve - Whether to preserve the property as it is read.
 * @return {Object} The Rule Node having been transformed.
 */

export default function transformRuleWithCustomMedia(rule, customMedia, preserve) {
	if (mediaAtRuleRegExp.test(rule.name) && customPseudoRegExp.test(rule.params)) {
		const originalParams = rule.params;
		const modifiedParams = transformStringWithCustomMedia(originalParams, customMedia);

		// conditionally transform values that have changed
		if (originalParams !== modifiedParams) {
			if (preserve) {
				rule.cloneBefore({ params: modifiedParams });
			} else {
				rule.params = modifiedParams;
			}
		}
	}

	return rule;
}

const mediaAtRuleRegExp = /^media$/i;
const customPseudoRegExp = /\(--[A-z][\w-]*\)/;
