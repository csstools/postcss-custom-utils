import { writeFile } from './fs-utils';

/**
 * Write Custom Media and Custom Properties to a Common JS file
 * @param {String} to - The pathname of the Common JS file being written to.
 * @param {Object} custom - The object of Custom Media and Custom Properties written to the file.
 */

export default function writeCustomToCjsFile(to, custom) {
	const cjsMediaContents = Object.keys(Object(custom.customMedia)).reduce((cjsLines, name) => {
		cjsLines.push(`\t\t'${escapeForJS(name)}': '${escapeForJS(custom.customMedia[name])}'`);

		return cjsLines;
	}, []).join(',\n');
	const cjsPropertiesContents = Object.keys(Object(custom.customProperties)).reduce((cjsLines, name) => {
		cjsLines.push(`\t\t'${escapeForJS(name)}': '${escapeForJS(custom.customProperties[name])}'`);

		return cjsLines;
	}, []).join(',\n');
	const cjsSelectorsContents = Object.keys(Object(custom.customSelectors)).reduce((cjsLines, name) => {
		cjsLines.push(`\t\t'${escapeForJS(name)}': '${escapeForJS(custom.customSelectors[name])}'`);

		return cjsLines;
	}, []).join(',\n');
	const cjs = `module.exports = {\n${cjsMediaContents
		? `\tcustomMedia: {\n${cjsMediaContents}\n\t}${cjsSelectorsContents || cjsPropertiesContents ? ',' : ''}\n`
	: ''}${cjsSelectorsContents
		? `\tcustomSelectors: {\n${cjsSelectorsContents}\n\t}${cjsPropertiesContents ? ',' : ''}\n`
	: ''}${cjsPropertiesContents
		? `\tcustomProperties: {\n${cjsPropertiesContents}\n\t}\n`
	: ''}};\n`;

	return writeFile(to, cjs);
}

function escapeForJS(string) {
	return string.replace(/\\([\s\S])|(')/g, '\\$1$2').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
