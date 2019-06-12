import postcss from 'postcss';
import readRoot from './readRoot';

/**
* Return Custom Variables from CSS
* @param {String} css
* @param {Object} options
* @return {Object} Custom Variables parsed from the CSS
*/

export default function readCSS (css, options) {
	options = Object(options);

	const processOptions = {
		from: options.filename,
		...Object(options.processOptions)
	};

	return readRoot(
		postcss.parse(css, processOptions),
		options
	);
}
