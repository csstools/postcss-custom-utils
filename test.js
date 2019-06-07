const utils = require('.');
const postcss = require('postcss');


describe('transformStringWith* from various sources', () => {
	const testSourcesContent = utils.readCustom(
		'./test/custom.css',
		'./test/custom.js',
		{ customProperties: { '--length-3': '20px' } },
	);

	test('customMedia', () => {
		return testSourcesContent.then(custom => {
			const testSource = 'all and (--mq-a)';
			const testExpect = 'all and (max-width: 30em),all and (max-height: 30em)';
			const testResult = utils.transformStringWithCustomMedia(testSource, custom.customMedia);

			return expect(testResult).toBe(testExpect);
		});
	});

	test('customProperties', () => {
		return testSourcesContent.then(custom => {
			const testSource = 'var(--length-1) var(--length-2) var(--length-3)';
			const testExpect = '10px 15px 20px';
			const testResult = utils.transformStringWithCustomProperties(testSource, custom.customProperties);

			return expect(testResult).toBe(testExpect);
		});
	});

	test('customSelectors', () => {
		return testSourcesContent.then(custom => {
			const testSource = ':--any-heading + p {}';
			const testExpect = 'h1 + p {},h2 + p {},h3 + p {},h4 + p {},h5 + p {},h6 + p {}';
			const testResult = utils.transformStringWithCustomSelectors(testSource, custom.customSelectors);

			return expect(testResult).toBe(testExpect);
		});
	});
})

describe('transformStringWith* from an object', () => {
	const testSourcesContent = Promise.resolve(utils.readCustomFromObject({
		customMedia: { '--mq-a': '(max-width: 30em), (max-height: 30em)' },
		customProperties: { '--length-0': '5px' },
		customSelectors: { ':--any-heading': 'h1, h2, h3, h4, h5, h6' }
	}));

	test('customMedia', () => {
		return testSourcesContent.then(custom => {
			const testSource = 'all and (--mq-a)';
			const testExpect = 'all and (max-width: 30em),all and (max-height: 30em)';
			const testResult = utils.transformStringWithCustomMedia(testSource, custom.customMedia);

			return expect(testResult).toBe(testExpect);
		});
	});

	test('customProperties', () => {
		return testSourcesContent.then(custom => {
			const testSource = 'var(--length-0)';
			const testExpect = '5px';
			const testResult = utils.transformStringWithCustomProperties(testSource, custom.customProperties);

			return expect(testResult).toBe(testExpect);
		});
	});

	test('customSelectors', () => {
		return testSourcesContent.then(custom => {
			const testSource = ':--any-heading + p {}';
			const testExpect = 'h1 + p {},h2 + p {},h3 + p {},h4 + p {},h5 + p {},h6 + p {}';
			const testResult = utils.transformStringWithCustomSelectors(testSource, custom.customSelectors);

			return expect(testResult).toBe(testExpect);
		});
	});
})

describe('transformStringWith* from a json file', () => {
	const testSourcesContent = utils.readCustomFromJsonFile('./test/custom.json');

	test('customMedia', () => {
		return testSourcesContent.then(custom => {
			const testSource = 'all and (--mq-a)';
			const testExpect = 'all and (max-width: 30em),all and (max-height: 30em)';
			const testResult = utils.transformStringWithCustomMedia(testSource, custom.customMedia);

			return expect(testResult).toBe(testExpect);
		});
	});

	test('customProperties', () => {
		return testSourcesContent.then(custom => {
			const testSource = 'var(--length-4)';
			const testExpect = '25px';
			const testResult = utils.transformStringWithCustomProperties(testSource, custom.customProperties);

			return expect(testResult).toBe(testExpect);
		});
	});

	test('customSelectors', () => {
		return testSourcesContent.then(custom => {
			const testSource = ':--heading + p {}';
			const testExpect = 'h1 + p {},h2 + p {},h3 + p {}';
			const testResult = utils.transformStringWithCustomSelectors(testSource, custom.customSelectors);

			return expect(testResult).toBe(testExpect);
		});
	});
})

describe('transformStringWith* from a PostCSS-processed string', () => {
	const testCustomCss = `
		@custom-media --mq-a (max-width: 30em), (max-height: 30em);
		@custom-selector :--any-heading h1, h2, h3, h4, h5, h6;
		:root { --length-5: 10px }
	`;
	const testSourcesContent = postcss([() => {}])
		.process(testCustomCss, { from: '<stdin>' })
		.then(({ root }) => utils.readCustomFromRoot(root));

	test('customMedia', () => {
		return testSourcesContent.then(custom => {
			const testSource = 'all and (--mq-a)';
			const testExpect = 'all and (max-width: 30em),all and (max-height: 30em)';
			const testResult = utils.transformStringWithCustomMedia(testSource, custom.customMedia);

			return expect(testResult).toBe(testExpect);
		});
	});

	test('customProperties', () => {
		return testSourcesContent.then(custom => {
			const testSource = 'var(--length-5)';
			const testExpect = '10px';
			const testResult = utils.transformStringWithCustomProperties(testSource, custom.customProperties);

			return expect(testResult).toBe(testExpect);
		});
	});

	test('customSelectors', () => {
		return testSourcesContent.then(custom => {
			const testSource = ':--any-heading + p {}';
			const testExpect = 'h1 + p {},h2 + p {},h3 + p {},h4 + p {},h5 + p {},h6 + p {}';
			const testResult = utils.transformStringWithCustomSelectors(testSource, custom.customSelectors);

			return expect(testResult).toBe(testExpect);
		});
	});
})


// describe('writeCustom exports different formats', () => {
// 	const testSourcesContent = Promise.resolve(utils.readCustomFromObject({
// 		customMedia: { '--mq-a': '(max-width: 30em), (max-height: 30em)' },
// 		customProperties: { '--length-0': '5px' },
// 		customSelectors: { ':--heading': 'h1, h2, h3' }
// 	}));

// 	test('css', () => {
// 		return testSourcesContent.then(custom => {
// 			const write = utils.writeCustom(custom, 'test/export.css')
// 			const read = utils.readFile('test/export.css')
// 			const testExpect = `
// 				@custom-media --mq-a (max-width: 30em), (max-height: 30em);
// 				@custom-selector :--heading h1, h2, h3;
// 				:root { --length-0: 5px; }
// 			`

// 			// TODO: Fix tests failing sometimes because of Promises and fs? 🤷‍♂️
// 			return Promise.all([write, read]).then(([,content]) => expect(content).toMatchCss(testExpect))
// 		});
// 	});

// 	test('js', () => {
// 		return testSourcesContent.then(custom => {
// 			const write = utils.writeCustom(custom, 'test/export.js')
// 			const read = utils.readFile('test/export.js')
// 			const testExpect = `
// 				@custom-media --mq-a (max-width: 30em), (max-height: 30em);
// 				@custom-selector :--heading h1, h2, h3;
// 				:root { --length-0: 5px; }
// 			`

// 			// TODO: Fix tests failing sometimes because of Promises and fs? 🤷‍♂️
// 			return Promise.all([write, read]).then(([,content]) => expect(content).toMatchCss(testExpect))
// 		});
// 	});

// 	test('json', () => {
// 		return testSourcesContent.then(custom => {
// 			const write = utils.writeCustom(custom, 'test/export.json')
// 			const read = utils.readFile('test/export.json')
// 			const testExpect = `
// 				@custom-media --mq-a (max-width: 30em), (max-height: 30em);
// 				@custom-selector :--heading h1, h2, h3;
// 				:root { --length-0: 5px; }
// 			`

// 			// TODO: Fix tests failing sometimes because of Promises and fs? 🤷‍♂️
// 			return Promise.all([write, read]).then(([,content]) => expect(content).toMatchCss(testExpect))
// 		});
// 	});

// 	test('mjs', () => {
// 		return testSourcesContent.then(custom => {
// 			const write = utils.writeCustom(custom, 'test/export.mjs')
// 			const read = utils.readFile('test/export.mjs')
// 			const testExpect = `
// 				@custom-media --mq-a (max-width: 30em), (max-height: 30em);
// 				@custom-selector :--heading h1, h2, h3;
// 				:root { --length-0: 5px; }
// 			`

// 			// TODO: Fix tests failing sometimes because of Promises and fs? 🤷‍♂️
// 			return Promise.all([write, read]).then(([,content]) => expect(content).toMatchCss(testExpect))
// 		});
// 	});
// })
