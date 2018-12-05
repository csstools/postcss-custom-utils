import transformRootWithCustomMedia from './transform-root-with-custom-media';
import transformRootWithCustomProperties from './transform-root-with-custom-properties';

/**
 * Transform a Root with Custom Media and Custom Properties
 * @param {Object} root - The root node being walked and transformed.
 * @param {Object} custom - The Custom Media and Custom Properties being used for the transformation.
 * @param {Boolean} preserve - Whether to preserve media rules using Custom Media and declarations using Custom Properties.
 * @return {Object} The root node having been walked and transformed.
 */

export default function transformRootWithCustom(root, custom, preserve) {
	transformRootWithCustomMedia(root, Object(custom.customMedia), preserve);
	transformRootWithCustomProperties(root, Object(custom.customProperties), preserve);

	return root;
}
