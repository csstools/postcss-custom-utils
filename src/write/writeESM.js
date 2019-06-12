import getFeatures from '../getFeatures';
import getVariables from '../getVariables';

export default function writeESM (options) {
	const features = getFeatures(options);
	const { customMedia, customProperties, customSelectors } = getVariables(options);

	const esmMediaContents = features.customMedia
		? Object.keys(customMedia).reduce((esmLines, name) => {
			esmLines.push(`\t'${escapeForJS(name)}': '${escapeForJS(customMedia[name])}'`);

			return esmLines;
		}, []).join(',\n')
	: '';

	const esmPropertiesContents = features.customProperties
		? Object.keys(customProperties).reduce((esmLines, name) => {
			esmLines.push(`\t'${escapeForJS(name)}': '${escapeForJS(customProperties[name])}'`);

			return esmLines;
		}, []).join(',\n')
	: '';

	const esmSelectorsContents = features.customSelectors
		? Object.keys(customSelectors).reduce((esmLines, name) => {
			esmLines.push(`\t'${escapeForJS(name)}': '${escapeForJS(customSelectors[name])}'`);

			return esmLines;
		}, []).join(',\n')
	: '';

	const esm = `${esmMediaContents
		? `export const customMedia = {\n${esmMediaContents}\n};\n${esmSelectorsContents || esmPropertiesContents ? '\n' : ''}`
	: ''}${esmSelectorsContents
		? `export const customSelectors = {\n${esmSelectorsContents}\n};\n${esmPropertiesContents ? '\n' : ''}`
	: ''}${esmPropertiesContents
		? `export const customProperties = {\n${esmPropertiesContents}\n};\n`
	: ''}`;

	return esm;
}

function escapeForJS (string) {
	return String(string).replace(/\\([\s\S])|(')/g, '\\$1$2').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
