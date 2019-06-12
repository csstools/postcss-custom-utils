import getFeatures from '../getFeatures';
import getVariables from '../getVariables';

export default function writeCJS (options) {
	const features = getFeatures(options);
	const { customMedia, customProperties, customSelectors } = getVariables(options);

	const cjsMediaContents = features.customMedia
		? Object.keys(customMedia).reduce((cjsLines, name) => {
			cjsLines.push(`\t\t'${escapeForJS(name)}': '${escapeForJS(customMedia[name])}'`);

			return cjsLines;
		}, []).join(',\n')
	: '';

	const cjsPropertiesContents = features.customProperties
		? Object.keys(customProperties).reduce((cjsLines, name) => {
			cjsLines.push(`\t\t'${escapeForJS(name)}': '${escapeForJS(customProperties[name])}'`);

			return cjsLines;
		}, []).join(',\n')
	: '';

	const cjsSelectorsContents = features.customSelectors
		? Object.keys(customSelectors).reduce((cjsLines, name) => {
			cjsLines.push(`\t\t'${escapeForJS(name)}': '${escapeForJS(customSelectors[name])}'`);

			return cjsLines;
		}, []).join(',\n')
	: '';

	const cjs = `module.exports = {\n${cjsMediaContents
		? `\tcustomMedia: {\n${cjsMediaContents}\n\t}${cjsSelectorsContents || cjsPropertiesContents ? ',' : ''}\n`
	: ''}${cjsSelectorsContents
		? `\tcustomSelectors: {\n${cjsSelectorsContents}\n\t}${cjsPropertiesContents ? ',' : ''}\n`
	: ''}${cjsPropertiesContents
		? `\tcustomProperties: {\n${cjsPropertiesContents}\n\t}\n`
	: ''}};\n`;

	return cjs;
}

function escapeForJS (string) {
	return String(string).replace(/\\([\s\S])|(')/g, '\\$1$2').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
