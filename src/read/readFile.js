import f from 'fse';
import p from 'path';
import readCSS from './readCSS';
import readJS from './readJS';
import readJSON from './readJSON';

/**
* Return Custom Variables from a File
* @param {String} filename
* @param {Object} options
* @return {Object} Custom Variables read from the File
*/

export default function readFile (filename, options) {
	const { async, type, ...moreOptions } = Object(options);

	Object.assign(moreOptions, { filename });

	const extension = String(type || p.extname(moreOptions.filename).slice(1)).toLowerCase();

	const read = extension === 'cjs' || extension === 'js'
		? readJS
	: extension === 'json'
		? readJSON
	: readCSS;

	return async
		? f.readFile(filename, 'utf8').then(
			data => read(data, moreOptions)
		)
	: read(
		f.readFileSync(filename, 'utf8'),
		moreOptions
	);
}
