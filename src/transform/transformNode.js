import transformNodeWithCustomMedia from './transformNodeWithCustomMedia';
import transformNodeWithCustomProperties from './transformNodeWithCustomProperties';
import transformNodeWithCustomSelectors from './transformNodeWithCustomSelectors';

export default function transformNode (node, options) {
	node.walk(node => {
		if (node.type === 'atrule') {
			transformNodeWithCustomMedia(node, options);
		} else if (node.type === 'decl') {
			transformNodeWithCustomProperties(node, options);
		} else if (node.type === 'rule') {
			transformNodeWithCustomSelectors(node, options);
		}
	});

	return node;
}
