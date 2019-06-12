import getFeatures from '../getFeatures';
import getVariables from '../getVariables';

export default function writeCSS (options) {
	const features = getFeatures(options);
	const { customMedia, customProperties, customSelectors } = getVariables(options);

	const cssMediaContents = features.customMedia
		? Object.keys(customMedia).reduce((cssLines, name) => {
			cssLines.push(`@custom-media ${name} ${customMedia[name]};`);

			return cssLines;
		}, []).join('\n')
	: '';

	const cssPropertiesContents = features.customProperties
		? Object.keys(customProperties).reduce((cssLines, name) => {
			cssLines.push(`\t${name}: ${customProperties[name]};`);

			return cssLines;
		}, []).join('\n')
	: '';

	const cssSelectorsContents = features.customSelectors
		? Object.keys(customSelectors).reduce((cssLines, name) => {
			cssLines.push(`@custom-selector ${name} ${customSelectors[name]};`);

			return cssLines;
		}, []).join('\n')
	: '';

	const css = `${cssMediaContents
		? `${cssMediaContents}\n${cssSelectorsContents || cssPropertiesContents ? '\n' : ''}`
	: ''}${cssSelectorsContents
		? `${cssSelectorsContents}\n${cssPropertiesContents ? '\n' : ''}`
	: ''}${cssPropertiesContents
		? `:root {\n${cssPropertiesContents}\n}\n`
	: ''}`;

	return css;
}
