import getOptions from '../getOptions';
import transformNode from './transformNode';
import transformStringWithCustomSelectors from './transformStringWithCustomSelectors';

// transform rules with custom selectors
export default function transformNodeWithCustomSelectors (rule, options) {
	const { features, preserve } = getOptions(options);

	if (features.customSelectors && isTransformableRule(rule)) {
		const originalSelector = rule.selector;
		const modifiedSelector = transformStringWithCustomSelectors(originalSelector, options);

		// conditionally transform values that have changed
		if (originalSelector !== modifiedSelector) {
			if (preserve.customSelectors) {
				transformNode(
					rule.cloneBefore({ selector: modifiedSelector }),
					options
				);
			} else {
				rule.selector = modifiedSelector;
			}
		}
	}
}

// whether the rule should be potentially transformed
function isTransformableRule (rule) {
	return customPseudoRegExp.test(rule.selector);
}

// match custom selectors
const customPseudoRegExp = /:--[A-z][\w-]*/;
