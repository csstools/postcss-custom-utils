import parseCustomMediaFromString from './parse-custom-media-from-string';
import transformNodeWithCustomMedia from './transform-node-with-custom-media';

/**
 * Return a Media Query parameter string transformed with Custom Media
 * @param {String} string - The media parameters being transformed.
 * @param {Object} customMedia - The Custom Media being used for the transformation.
 * @param {Boolean} preserve - Whether to preserve the property as it is read.
 * @return {String} The media parameters that have been transformed.
 */

export default function transformStringWithCustomMedia (string, customMedia) {
	const mediaAST = parseCustomMediaFromString(string);
	const modifiedString = String(transformNodeWithCustomMedia(mediaAST, customMedia));

	return modifiedString;
}
