import postcss from 'postcss';
import transformRoot from './transformRoot';

/**
* Return Custom Variables from CSS
* @param {String} css
* @param {Object} options
* @return {Object} Custom Variables parsed from the CSS
*/

export default function transformCSS (css, options) {
	const { filename, processOptions, ...moreOptions } = Object(options);

	const root = postcss.parse(css, {
		from: filename,
		...Object(processOptions)
	});

	return String(transformRoot(root, moreOptions));
}
