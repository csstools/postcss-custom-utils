import getOptions from '../getOptions';
import transformStringWithCustomMedia from './transformStringWithCustomMedia';
import transformWalk from './transformNode';

/**
 * Transform a Rule with Custom Media
 * @param {Object} rule - The Rule Node being transformed.
 * @param {Object} customMedia - The Custom Media being used for the transformation.
 * @param {Boolean} preserve - Whether to preserve the property as it is read.
 * @return {Object} The Rule Node having been transformed.
 */

export default function transformNodeWithCustomMedia (rule, options) {
	const { features, preserve } = getOptions(options);

	if (features.customMedia && mediaAtRuleRegExp.test(rule.name) && customPseudoRegExp.test(rule.params)) {
		const originalParams = rule.params;
		const modifiedParams = transformStringWithCustomMedia(originalParams, options);

		// conditionally transform values that have changed
		if (originalParams !== modifiedParams) {
			if (preserve.customMedia) {
				transformWalk(
					rule.cloneBefore({ params: modifiedParams }),
					options
				);
			} else {
				rule.params = modifiedParams;
			}
		}
	}
}

const mediaAtRuleRegExp = /^media$/i;
const customPseudoRegExp = /\(--[A-z][\w-]*\)/;
