import { writeFile } from './fs-utils';

/**
 * Write Custom Media and Custom Properties to a ECMAScript Module file
 * @param {String} to - The pathname of the ECMAScript Module file being written to.
 * @param {Object} custom - The object of Custom Media and Properties written to the file.
 */

export default function writeCustomToEsmFile (to, custom) {
	const esmMediaContents = Object.keys(Object(custom.customMedia)).reduce((esmLines, name) => {
		esmLines.push(`\t'${escapeForJS(name)}': '${escapeForJS(custom.customMedia[name])}'`);

		return esmLines;
	}, []).join(',\n');
	const esmPropertiesContents = Object.keys(Object(custom.customProperties)).reduce((esmLines, name) => {
		esmLines.push(`\t'${escapeForJS(name)}': '${escapeForJS(custom.customProperties[name])}'`);

		return esmLines;
	}, []).join(',\n');
	const esmSelectorsContents = Object.keys(Object(custom.customSelectors)).reduce((esmLines, name) => {
		esmLines.push(`\t'${escapeForJS(name)}': '${escapeForJS(custom.customSelectors[name])}'`);

		return esmLines;
	}, []).join(',\n');
	const esm = `${esmMediaContents
		? `export const customMedia = {\n${esmMediaContents}\n};\n${esmSelectorsContents || esmPropertiesContents ? '\n' : ''}`
	: ''}${esmSelectorsContents
		? `export const customSelectors = {\n${esmSelectorsContents}\n};\n${esmPropertiesContents ? '\n' : ''}`
	: ''}${esmPropertiesContents
		? `export const customProperties = {\n${esmPropertiesContents}\n};\n`
	: ''}`;

	return writeFile(to, esm);
}

function escapeForJS (string) {
	return string.replace(/\\([\s\S])|(')/g, '\\$1$2').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
