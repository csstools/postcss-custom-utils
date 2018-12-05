import transformRuleWithCustomMedia from './transform-rule-with-custom-media';

/**
 * Transform a Root with Custom Media
 * @param {Object} root - The root node being walked and transformed.
 * @param {Object} customMedia - The Custom Media being used for the transformation.
 * @param {Boolean} preserve - Whether to preserve media rules using Custom Media.
 * @return {Object} The root node having been walked and transformed.
 */

export default function transformRootWithCustomMedia(root, customMedia, preserve) {
	root.walkAtRules(rule => {
		transformRuleWithCustomMedia(rule, customMedia, preserve);
	});

	return root;
}
