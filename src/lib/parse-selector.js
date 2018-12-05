import parser from 'postcss-selector-parser';

/* Return a Selectors AST from a Selectors String
/* ========================================================================== */

export default function parseSelector(selectorString) {
	let selectorAST;

	parser(selectors => {
		selectorAST = selectors
	}).processSync(selectorString);

	return selectorAST;
}
