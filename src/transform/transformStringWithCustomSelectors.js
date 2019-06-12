import selectorParser from 'postcss-selector-parser';
import transformSelectorsWithCustomSelectors from './lib/transformSelectorsWithCustomSelectors';

export default function transformStringCustomSelectors (string, options) {
	return selectorParser(
		selectors => {
			transformSelectorsWithCustomSelectors(
				selectors,
				{
					...Object(Object(Object(options).variables).customSelectors)
				}
			);
		}
	).processSync(string);
}
