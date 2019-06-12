import cjs from './lib/cjs';
import readObject from './readObject';

/**
* Return Custom Variables from the JS File
* @param {String} filename
* @param {Object} options
* @return {Object} Custom Variables parsed from the JS
*/

export default function readJS (js, options) {
	options = Object(options);

	return readObject(
		cjs.requireSource(js, options.filename)
	);
}
