import transformNodeWithCustomMedia from './transformNodeWithCustomMedia';
import transformNodeWithCustomProperties from './transformNodeWithCustomProperties';
import transformNodeWithCustomSelectors from './transformNodeWithCustomSelectors';
import transformNodeWithEnvironmentVariables from './transformNodeWithEnvironmentVariables';

export default function transformNode (node, options) {
	node.walk(node => {
		if (node.type === 'atrule') {
			transformNodeWithEnvironmentVariables(node, options);
			transformNodeWithCustomMedia(node, options);
		} else if (node.type === 'decl') {
			transformNodeWithEnvironmentVariables(node, options);
			transformNodeWithCustomProperties(node, options);
		} else if (node.type === 'rule') {
			transformNodeWithCustomSelectors(node, options);
		}
	});

	return node;
}
