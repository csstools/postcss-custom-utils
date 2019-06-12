import f from 'fse';
import p from 'path';
import writeCJS from './writeCJS';
import writeCSS from './writeCSS';
import writeESM from './writeESM';
import writeJSON from './writeJSON';

/**
* Write Custom Variables to a File
* @param {String} filename
* @param {Object} options
* @return {Object} Custom Variables parsed from the File
*/

export default function writeFile (filename, options) {
	const { async, type, ...moreOptions } = Object(options);

	const extension = String(type || p.extname(filename).slice(1)).toLowerCase();

	const write = extension === 'cjs' || extension === 'js'
		? writeCJS
	: extension === 'json'
		? writeJSON
	: extension === 'esm' || extension === 'mjs'
		? writeESM
	: writeCSS;

	return async
		? f.writeFile(
			filename,
			write(moreOptions)
		)
	: Promise.resolve(
		f.writeFileSync(
			filename,
			write(moreOptions)
		)
	);
}
