import { parse as valueParser } from 'postcss-values-parser';
import transformValuesWithCustomProperties from './lib/transformValuesWithCustomProperties';

/**
* Return a Declaration Value string transformed with Custom Properties
* @param {String} string - The value being transformed.
* @param {Object} customProperties - The Custom Properties being used for the transformation.
* @return {String} The value having been transformed.
*/

export default function transformStringWithCustomProperties (string, options) {
	return String(
		transformValuesWithCustomProperties(
			valueParser(string),
			{
				...Object(Object(Object(options).variables).customProperties)
			}
		)
	);
}
