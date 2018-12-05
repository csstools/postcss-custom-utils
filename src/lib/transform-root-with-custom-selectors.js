import transformStringWithCustomSelectors from './transform-string-with-custom-selectors';

/**
 * Transform a Root with Custom Selectors
 * @param {Object} root - The root node being walked and transformed.
 * @param {Object} customSelectors - The Custom Selectors being used for the transformation.
 * @param {Boolean} preserve - Whether to preserve declarations using Custom Selectors.
 * @return {Object} The root node having been walked and transformed.
 */

export default function transformRootWithCustomSelectors(root, customSelectors, preserve) {
	root.walkRules(customPseudoRegExp, rule => {
		const modifiedSelector = transformStringWithCustomSelectors(rule.selector);

		if (preserve) {
			rule.cloneBefore({ selector: modifiedSelector });
		} else {
			rule.selector = modifiedSelector;
		}
	});

	return root;
}

const customPseudoRegExp = /:--[A-z][\w-]*/;
