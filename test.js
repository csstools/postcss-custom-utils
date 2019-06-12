const fs = require('fs');
const util = require('.');
const postcss = require('postcss');

describe('util.read', () => {
	const sourceFilename = './test/custom.css';
	const sourceContents = fs.readFileSync(sourceFilename, 'utf8');
	const sourceTreeRoot = postcss.parse(sourceContents, { from: sourceFilename });

	const tests = Object.entries({
		'read': {
			source: util.read(sourceFilename),
			expect: sourceContents,
		},
		'read (custom.js)': {
			source: util.read('./test/custom.js'),
			expect: sourceContents,
		},
		'read (custom.json)': {
			source: util.read('./test/custom.json'),
			expect: sourceContents,
		},
		'readCSS': {
			source: util.readCSS(sourceContents),
			expect: sourceContents,
		},
		'readFile': {
			source: util.readFile(sourceFilename),
			expect: sourceContents,
		},
		'readRoot': {
			source: util.readRoot(sourceTreeRoot),
			expect: sourceContents,
		},
	});

	test.each(tests)('%s', (description, testParams) => {
		const { source: variables } = testParams;
		const resultCSS = util.writeCSS({ variables });

		return expect(resultCSS).toBe(sourceContents);
	});
});

describe('util.write', () => {
	const variables = util.read('./test/custom.css');

	test('writeCJS', () => {
		const resultCJS = util.writeCJS({ variables });

		const expectCJS = fs.readFileSync('./test/write.writeCJS.expect.js', 'utf8');

		expect(resultCJS).toBe(expectCJS);
	});

	test('writeCSS', () => {
		const resultCSS = util.writeCSS({ variables });

		const expectCSS = fs.readFileSync('./test/write.writeCSS.expect.css', 'utf8');

		expect(resultCSS).toBe(expectCSS);
	});

	test('writeESM', () => {
		const resultESM = util.writeESM({ variables });

		const expectESM = fs.readFileSync('./test/write.writeESM.expect.css', 'utf8');

		expect(resultESM).toBe(expectESM);
	});

	test('writeFile', () => {
		util.writeFile('./test/write.writeFile.result.css', { variables });

		const resultESM = fs.readFileSync('./test/write.writeFile.result.css', 'utf8');

		const expectESM = fs.readFileSync('./test/write.writeFile.expect.css', 'utf8');

		expect(resultESM).toBe(expectESM);
	});

	test('writeFile (.js)', () => {
		util.writeFile('./test/write.writeFile.result.js', { variables });

		const resultESM = fs.readFileSync('./test/write.writeFile.result.js', 'utf8');

		const expectESM = fs.readFileSync('./test/write.writeFile.expect.js', 'utf8');

		expect(resultESM).toBe(expectESM);
	});

	test('writeFile (.json)', () => {
		util.writeFile('./test/write.writeFile.result.json', { variables });

		const resultESM = fs.readFileSync('./test/write.writeFile.result.json', 'utf8');

		fs.writeFileSync('./test/write.writeFile.expect.json', resultESM);

		const expectESM = fs.readFileSync('./test/write.writeFile.expect.json', 'utf8');

		expect(resultESM).toBe(expectESM);
	});

	test('writeRoot', () => {
		const astRoot = postcss.parse('', { from: '' });

		util.writeRoot(astRoot, { variables });

		fs.writeFileSync('./test/write.writeRoot.result.css', String(astRoot));

		const resultESM = fs.readFileSync('./test/write.writeRoot.result.css', 'utf8');

		const expectESM = fs.readFileSync('./test/write.writeRoot.expect.css', 'utf8');

		expect(resultESM).toBe(expectESM);
	});
});

describe('util.transformCSS', () => {
	const variables = util.read('./test/custom.css');

	const testSources = Object.entries({
		customMedia: {
			source: '@media all and (--mq-a) {}',
			expect: '@media all and (max-width: 30em),all and (max-height: 30em) {}\n@media all and (--mq-a) {}',
		},
		customProperties: {
			source: 'section { padding: var(--length); }',
			expect: 'section { padding: 5px; padding: var(--length); }',
		},
		customSelectors: {
			source: ':--heading + p {}',
			expect: 'h1 + p,h2 + p,h3 + p,h4 + p,h5 + p,h6 + p {}\n:--heading + p {}',
		},
	});

	test.each(testSources)('%s', (description, testParams) => {
		const { source: testSource, expect: testExpect } = testParams;

		const testResult = util.transformCSS(testSource, { variables });

		return expect(testResult).toBe(testExpect);
	});
});

describe('util.transformFile', () => {
	const variables = util.read('./test/custom.css');

	const tests = Object.entries({
		'transformFile': {
			source: './test/transform.css',
			expect: './test/transform.expect.css',
		},
		'transformFile with options { preserve: false }': {
			source: './test/transform.css',
			expect: './test/transform.preserve_false.expect.css',
			options: { preserve: false },
		},
		'transformFile with options { preserve: "custom-media" }': {
			source: './test/transform.css',
			expect: './test/transform.preserve_custom_media.expect.css',
			options: { preserve: 'custom-media' },
		},
		'transformFile with options { preserve: "custom-selectors" }': {
			source: './test/transform.css',
			expect: './test/transform.preserve_custom_selectors.expect.css',
			options: { preserve: 'custom-selectors' },
		},
	});

	test.each(tests)('%s', (description, testParams) => {
		const { source: sourceFilename, expect: expectFilename, options: testOptions } = testParams;
		const resultCSS = util.transformFile(sourceFilename, { variables, ...Object(testOptions) });
		const expectCSS = fs.readFileSync(expectFilename, 'utf8');

		return expect(resultCSS).toBe(expectCSS);
	});
});

describe('util.transformRoot', () => {
	const sourceFilename = './test/transform.css';
	const sourceContents = fs.readFileSync(sourceFilename);
	const variables = util.read('./test/custom.css');

	const tests = Object.entries({
		'transformRoot': {
			source: postcss.parse(sourceContents, { from: sourceFilename }),
			expect: './test/transform.expect.css',
		},
		'transformRoot with options { preserve: false }': {
			source: postcss.parse(sourceContents, { from: sourceFilename }),
			expect: './test/transform.preserve_false.expect.css',
			options: { preserve: false },
		},
		'transformRoot with options { preserve: "custom-media" }': {
			source: postcss.parse(sourceContents, { from: sourceFilename }),
			expect: './test/transform.preserve_custom_media.expect.css',
			options: { preserve: 'custom-media' },
		},
		'transformRoot with options { preserve: "custom-selectors" }': {
			source: postcss.parse(sourceContents, { from: sourceFilename }),
			expect: './test/transform.preserve_custom_selectors.expect.css',
			options: { preserve: 'custom-selectors' },
		},
	});

	test.each(tests)('%s', (description, testParams) => {
		const { source: sourceRoot, expect: expectFilename, options: testOptions } = testParams;
		const resultCSS = String(util.transformRoot(sourceRoot, { variables, ...Object(testOptions) }));
		const expectCSS = fs.readFileSync(expectFilename, 'utf8');

		return expect(resultCSS).toBe(expectCSS);
	});
});
