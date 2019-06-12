import parseMedia from '../read/lib/parseMedia';
import transformMediaWithCustomMedia from './lib/transformMediaWithCustomMedia';

/**
 * Return a Media Query parameter string transformed with Custom Media
 * @param {String} string - The media parameters being transformed.
 * @param {Object} customMedia - The Custom Media being used for the transformation.
 * @param {Boolean} preserve - Whether to preserve the property as it is read.
 * @return {String} The media parameters that have been transformed.
 */

export default function transformStringWithCustomMedia (string, options) {
	return String(
		transformMediaWithCustomMedia(
			parseMedia(string),
			{
				...Object(Object(Object(options).variables).customMedia)
			}
		)
	);
}
