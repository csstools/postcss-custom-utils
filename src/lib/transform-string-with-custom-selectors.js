import parser from 'postcss-selector-parser';
import transformNodeWithCustomSelectors from './transform-node-with-custom-selectors';

export default function transformStringWithCustomSelectors (string, customSelectors) {
	const modifiedString = parser(selectors => {
		transformNodeWithCustomSelectors(selectors, customSelectors)
	}).processSync(string);

	return modifiedString;
}
