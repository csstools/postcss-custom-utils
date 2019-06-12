export default function transformValuesWithCustomProperties (node, customProperties) {
	if (node.nodes && node.nodes.length) {
		node.nodes.slice().forEach(child => {
			if (isVarFunction(child)) {
				// eslint-disable-next-line no-unused-vars
				const [propertyNode, comma, ...fallbacks] = child.nodes;
				const { value: name } = propertyNode;

				if (name in customProperties) {
					// conditionally replace a known custom property
					const nodes = asClonedArrayWithBeforeSpacing(customProperties[name].nodes, child.raws.before);

					child.replaceWith(...nodes);

					retransformValuesWithCustomProperties({ nodes }, customProperties, name);
				} else if (fallbacks.length) {
					// conditionally replace a custom property with a fallback
					const index = node.nodes.indexOf(child);

					if (index !== -1) {
						node.nodes.splice(index, 1, ...asClonedArrayWithBeforeSpacing(fallbacks, child.raws.before));
					}

					transformValuesWithCustomProperties(node, customProperties);
				}
			} else {
				transformValuesWithCustomProperties(child, customProperties);
			}
		});
	}

	return node;
}

// retransform the current ast without a custom property (to prevent recursion)
function retransformValuesWithCustomProperties (root, customProperties, withoutProperty) {
	const nextCustomProperties = {
		...Object(customProperties)
	}

	delete nextCustomProperties[withoutProperty];

	return transformValuesWithCustomProperties(root, nextCustomProperties);
}

// return an array with its nodes cloned, preserving the raw
function asClonedArrayWithBeforeSpacing (array, beforeSpacing) {
	const clonedArray = asClonedArray(array, null);

	if (clonedArray[0]) {
		clonedArray[0].raws.before = beforeSpacing;
	}

	return clonedArray;
}

// return a cloned node
function asClonedNode (node, parent) {
	const cloneNode = new node.constructor(node);

	for (const key in node) {
		if (key === 'parent') {
			cloneNode.parent = parent;
		} else if (Array.isArray(node[key])) {
			cloneNode[key] = asClonedArray(node.nodes, cloneNode);
		} else if (node[key] === Object(node[key])) {
			cloneNode[key] = Object.assign({}, node[key]);
		}
	}

	return cloneNode;
}

// return an array with its nodes cloned
function asClonedArray (array, parent) {
	return array.map(node => asClonedNode(node, parent));
}

// whether the node is a var() function
function isVarFunction (node) {
	return Object(node).type === 'func' && varRegExp.test(node.name) && Object(node.nodes).length > 0;
}

// match var() functions
const varRegExp = /^var$/i;
