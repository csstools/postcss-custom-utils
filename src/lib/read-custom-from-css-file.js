import postcss from 'postcss';
import readCustomFromRoot from './read-custom-from-root';
import { readFile } from './fs-utils';

/**
 * Returns Custom Media and Custom Properties from a CSS file
 * @param {String} from - The pathname of the CSS file being read.
 * @return {Object} The Custom Media and Custom Properties read from the file.
 */

export default async function readCustomFromCssFile (from) {
	const css = await readFile(from);
	const root = postcss.parse(css, { from });

	return readCustomFromRoot(root, true);
}
