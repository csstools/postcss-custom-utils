import postcss from 'postcss';
import readCustomFromRoot from './read-custom-from-root';
import { readFile, readFileSync } from './fs-utils';

/**
 * Returns Custom Media and Custom Properties from a CSS file
 * @param {String} from - The pathname of the CSS file being read.
 * @return {Object} The Custom Media and Custom Properties read from the file.
 */

export async function async (from) {
	const css = await readFile(from);
	const root = postcss.parse(css, { from });

	return readCustomFromRoot(root, true);
}

export function sync (from) {
	const css = readFileSync(from);
	const root = postcss.parse(css, { from });

	return readCustomFromRoot(root, true);
}
