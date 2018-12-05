import transformDeclWithCustomProperties from './transform-decl-with-custom-properties';

/**
 * Transform a Root with Custom Properties
 * @param {Object} root - The root node being walked and transformed.
 * @param {Object} customProperties - The Custom Properties being used for the transformation.
 * @param {Boolean} preserve - Whether to preserve declarations using Custom Properties.
 * @return {Object} The root node having been walked and transformed.
 */

export default function transformRootWithCustomProperties(root, customProperties, preserve) {
	root.walkDecls(decl => {
		transformDeclWithCustomProperties(decl, customProperties, preserve);
	});

	return root;
}
