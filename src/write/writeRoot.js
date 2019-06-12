import { isString } from '../is';
import getFeatures from '../getFeatures';
import getVariables from '../getVariables';
import postcss from 'postcss';

export default function writeAST (root, options) {
	const features = getFeatures(options);
	const insert = getInsertStrategy(options);
	const { customMedia, customProperties, customSelectors } = getVariables(options);

	const nodes = [];

	// Create Custom Media Atrules
	if (features.customMedia) {
		for (const name in customMedia) {
			const atrule = postcss.atRule({
				name: 'custom-media',
				params: `${name} ${customMedia[name]}`
			});

			nodes.push(atrule);
		}
	}

	// Create Custom Selector Atrules
	if (features.customSelectors) {
		for (const name in customSelectors) {
			const atrule = postcss.atRule({
				name: 'custom-selector',
				params: `${name} ${customSelectors[name]}`
			});

			nodes.push(atrule);
		}
	}


	// Create Custom Property Declarations
	if (features.customProperties) {
		const rule = postcss.rule({ selector: ':root' });

		for (const name in customProperties) {
			const decl = postcss.decl({
				prop: name,
				value: String(customProperties[name])
			});

			rule.append(decl);
		}

		if (rule.nodes.length) {
			nodes.push(rule);
		}
	}

	// Append Custom Media, Custom Selectors, and then Custom Properties
	return root[insert](...nodes);
}

function getInsertStrategy (options) {
	return isString(Object(options).insert) && options.insert.toLowerCase() === 'after' ? 'append' : 'prepend';
}
