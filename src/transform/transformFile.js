import f from 'fse';
import transformCSS from './transformCSS';

/**
* Return Custom Variables from a File
* @param {String} filename
* @param {Object} options
* @return {Object} Custom Variables parsed from the File
*/

export default function transformFile (filename, options) {
	const { async, ...moreOptions } = Object(options);

	Object.assign(moreOptions, { filename });

	return async
		? f.readFile(filename, 'utf8').then(
			css => transformCSS(css, moreOptions)
		)
	: transformCSS(
		f.readFileSync(filename, 'utf8'),
		moreOptions
	);
}
