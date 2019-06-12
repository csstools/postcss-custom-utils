module.exports = {
	customMedia: {
		'--mq-a': '(max-width: 30em), (max-height: 30em)',
		'--not-mq-a': 'not all and (--mq-a)'
	},
	customSelectors: {
		':--heading-higher': 'h1, h2, h3',
		':--heading-lower': 'h4, h5, h6',
		':--heading': ':--heading-higher, :--heading-lower'
	},
	customProperties: {
		'--length': '5px',
		'--length-5': 'var(--length-5, 5px)'
	}
};
