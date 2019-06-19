export default function transformValuesWithEnvironmentVariables (node, environmentVariables) {
	if (node.nodes && node.nodes.length) {
		node.nodes.slice().forEach(child => {
			if (isEnvFunction(child)) {
				// eslint-disable-next-line no-unused-vars
				const [propertyNode] = child.nodes;
				const { value: name } = propertyNode;

				if (name in environmentVariables) {
					// conditionally replace a known custom property
					const nodes = asClonedArrayWithBeforeSpacing(environmentVariables[name].nodes, child.raws.before);

					child.replaceWith(...nodes);

					retransformValuesWithEnvironmentVariables({ nodes }, environmentVariables, name);
				}
			} else {
				transformValuesWithEnvironmentVariables(child, environmentVariables);
			}
		});
	}

	return node;
}

// retransform the current ast without a custom property (to prevent recursion)
function retransformValuesWithEnvironmentVariables (root, environmentVariables, withoutProperty) {
	const nextCustomProperties = {
		...Object(environmentVariables)
	}

	delete nextCustomProperties[withoutProperty];

	return transformValuesWithEnvironmentVariables(root, nextCustomProperties);
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
function isEnvFunction (node) {
	return Object(node).type === 'func' && envRegExp.test(node.name) && Object(node.nodes).length > 0;
}

// match env() functions
const envRegExp = /^env$/i;
