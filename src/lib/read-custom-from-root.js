import parseCustomMediaFromString from './parse-custom-media-from-string';
import { parse as valueParser } from 'postcss-values-parser';
import selectorParser from './parse-selector';

/**
 * Return Custom Media and Custom Properties from a CSS Root AST
 * @param {Object} from - The CSS root being read.
 * @param {Boolean} preserve - Whether to preserve the property as it is read.
 * @return {Object} The object of Custom Properties read from the CSS root.
 */

export default function readCustomPropertiesFromRoot (root, preserve) {
	// initialize custom objects
	const customPropertiesFromHtmlElement = {};
	const customPropertiesFromRootPsuedo = {};
	const customMedia = {};
	const customSelectors = {};

	// for each html or :root
	root.nodes.slice().forEach(node => {
		const customPropertiesObject = isHtmlRule(node)
			? customPropertiesFromHtmlElement
		: isRootRule(node)
			? customPropertiesFromRootPsuedo
		: null;

		// for each custom property
		if (customPropertiesObject) {
			node.nodes.slice().forEach(decl => {
				if (isCustomDecl(decl)) {
					const { prop } = decl;

					// write the parsed value to the custom property
					customPropertiesObject[prop] = valueParser(decl.value).nodes;

					// conditionally remove the custom property declaration
					if (!preserve) {
						decl.remove();
					}
				}
			});

			// conditionally remove the empty html or :root rule
			if (!preserve && isEmptyParent(node)) {
				node.remove();
			}
		}

		if (isCustomMedia(node)) {
			// extract the name and value from the params of the custom media
			const [, name, value] = node.params.match(customMediaParamsRegExp);

			// write the parsed media to the custom medias object
			customMedia[name] = parseCustomMediaFromString(value);

			// conditionally remove the custom selector atrule
			if (!preserve) {
				node.remove();
			}
		}

		if (isCustomSelector(node)) {
			// extract the name and selectors from the params of the custom selector
			const [, name, selectors] = node.params.match(customSelectorParamsRegExp);

			// write the parsed selectors to the custom selector
			customSelectors[name] = selectorParser(selectors);

			// conditionally remove the custom selector atrule
			if (!preserve) {
				node.remove();
			}
		}
	});

	// return all custom media, custom properties, preferring :root properties over html properties
	return {
		customMedia,
		customProperties: { ...customPropertiesFromHtmlElement, ...customPropertiesFromRootPsuedo },
		customSelectors
	};
}

// match html and :root
const htmlSelectorRegExp = /^html$/i;
const rootSelectorRegExp = /^:root$/i;

// match custom media
const customMediaNameRegExp = /^custom-media$/i;
const customMediaParamsRegExp = /^(--[A-z][\w-]*)\s+([\W\w]+)\s*$/;

// match custom properties
const customPropertyRegExp = /^--[A-z][\w-]*$/;

// match custom selectors
const customSelectorNameRegExp = /^custom-selector$/i;
const customSelectorParamsRegExp = /^(:--[A-z][\w-]*)\s+([\W\w]+)\s*$/;

// whether the atrule is a custom selector
const isCustomSelector = node => node.type === 'atrule' && customSelectorNameRegExp.test(node.name) && customSelectorParamsRegExp.test(node.params);

// whether the node is an html or :root rule
const isHtmlRule = node => node.type === 'rule' && htmlSelectorRegExp.test(node.selector) && Object(node.nodes).length;
const isRootRule = node => node.type === 'rule' && rootSelectorRegExp.test(node.selector) && Object(node.nodes).length;

// whether the node is an custom property
const isCustomDecl = node => node.type === 'decl' && customPropertyRegExp.test(node.prop);

// whether the atrule is a custom media
const isCustomMedia = node => node.type === 'atrule' && customMediaNameRegExp.test(node.name) && customMediaParamsRegExp.test(node.params);

// whether the node is a parent without children
const isEmptyParent = node => Object(node.nodes).length === 0;
