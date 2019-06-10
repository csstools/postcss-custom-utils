import { writeFile, writeFileSync } from './fs-utils';

/**
 * Write Custom Media and Custom Properties to a CSS file
 * @param {String} to - The pathname of the CSS file being written to.
 * @param {Object} custom - The object of Custom Media and Custom Properties written to the file.
 */

export function async (to, custom) {
	const css = getCssFromCustom(custom);

	return writeFile(to, css);
}

export function sync (to, custom) {
	const css = getCssFromCustom(custom);

	return writeFileSync(to, css);
}

function getCssFromCustom (custom) {
	const cssMediaContent = Object.keys(Object(custom.customMedia)).reduce((cssLines, name) => {
		cssLines.push(`@custom-media ${name} ${custom.customMedia[name]};`);

		return cssLines;
	}, []).join('\n');

	const cssPropertiesContent = Object.keys(Object(custom.customProperties)).reduce((cssLines, name) => {
		cssLines.push(`\t${name}: ${custom.customProperties[name]};`);

		return cssLines;
	}, []).join('\n');

	const cssSelectorsContent = Object.keys(Object(custom.customSelectors)).reduce((cssLines, name) => {
		cssLines.push(`@custom-selector ${name} ${custom.customSelectors[name]};`);

		return cssLines;
	}, []).join('\n');

	const css = `${cssMediaContent
		? `${cssMediaContent}\n${cssSelectorsContent || cssPropertiesContent ? '\n' : ''}`
	: ''}${cssSelectorsContent
		? `${cssSelectorsContent}\n${cssPropertiesContent ? '\n' : ''}`
	: ''}${cssPropertiesContent
		? `:root {\n${cssPropertiesContent}\n}\n`
	: ''}`;

	return css;
}
