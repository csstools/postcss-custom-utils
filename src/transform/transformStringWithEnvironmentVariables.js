import { parse as valueParser } from 'postcss-values-parser';
import transformValuesWithEnvironmentVariables from './lib/transformValuesWithEnvironmentVariables';

/**
* Return a String transformed with Environment Variables
* @param {String} string - The value being transformed.
* @param {Object} customProperties - The Environment Variables being used for the transformation.
* @return {String} The value having been transformed.
*/

export default function transformStringWithEnvironmentVariables (string, options) {
	return String(
		transformValuesWithEnvironmentVariables(
			valueParser(string),
			{
				...Object(Object(Object(options).variables).environmentVariables)
			}
		)
	);
}
