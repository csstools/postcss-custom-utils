import valueParser from 'postcss-values-parser';
import transformNodeWithCustomProperties from './transform-node-with-custom-properties';

/**
 * Return a Declaration Value string transformed with Custom Properties
 * @param {String} string - The value being transformed.
 * @param {Object} customProperties - The Custom Properties being used for the transformation.
 * @return {String} The value having been transformed.
 */

export default function transformValueWithCustomProperties(string, customProperties) {
	const valueAST = valueParser(string).parse();
	const modifiedString = String(transformNodeWithCustomProperties(valueAST, customProperties));

	return modifiedString;
}
