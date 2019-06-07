const postcss = require('postcss');
const utils = require('.');

[
	/* Test Custom Media and Custom Properties from various sources */
	() => utils.readCustom(
		'./test/custom.css',
		'./test/custom.js',
		{ customProperties: { '--length-3': '20px' } }
	).then(
		custom => {
			/* Test Custom Media */
			const sourceParams = 'all and (--mq-a)';
			const expectParams = 'all and (max-width: 30em),all and (max-height: 30em)';
			const resultParams = utils.transformStringWithCustomMedia(sourceParams, custom.customMedia);

			if (resultParams === expectParams) {
				console.log(`PASS: ${sourceParams} => ${resultParams}`);
			} else {
				throw new Error(`Expected: ${expectParams}\nReceived: ${resultParams}`);
			}

			/* Test Custom Properties */
			const sourceValue = 'var(--length-1) var(--length-2) var(--length-3)';
			const expectValue = '10px 15px 20px';
			const resultValue = utils.transformStringWithCustomProperties(sourceValue, custom.customProperties);

			if (resultValue === expectValue) {
				console.log(`PASS: ${sourceValue} => ${resultValue}`);
			} else {
				throw new Error(`Expected: ${expectValue}\nReceived: ${resultValue}`);
			}

			/* Test Custom Selectors */
			const sourceSelector = ':--any-heading + p {}';
			const expectSelector = 'h1 + p {},h2 + p {},h3 + p {},h4 + p {},h5 + p {},h6 + p {}';
			const resultSelector = utils.transformStringWithCustomSelectors(sourceSelector, custom.customSelectors);

			if (resultSelector === expectSelector) {
				console.log(`PASS: ${sourceSelector} => ${resultSelector}`);
			} else {
				throw new Error(`Expected: ${expectSelector}\nReceived: ${resultSelector}`);
			}
		}
	),

	/* Test Custom Media and Custom Properties from an Object */
	() => Promise.resolve(
		utils.readCustomFromObject({
			customMedia: { '--mq-a': '(max-width: 30em), (max-height: 30em)' },
			customProperties: { '--length-0': '5px' },
			customSelectors: { ':--any-heading': 'h1, h2, h3, h4, h5, h6' }
		})
	).then(
		custom => {
			/* Test Custom Media */
			const sourceParams = 'all and (--mq-a)';
			const expectParams = 'all and (max-width: 30em),all and (max-height: 30em)';
			const resultParams = utils.transformStringWithCustomMedia(sourceParams, custom.customMedia);

			if (resultParams === expectParams) {
				console.log(`PASS: ${sourceParams} => ${resultParams}`);
			} else {
				throw new Error(`Expected: ${expectParams}\nReceived: ${resultParams}`);
			}

			/* Test Custom Properties */
			const sourceValue = 'var(--length-0)';
			const expectValue = '5px';
			const resultValue = utils.transformStringWithCustomProperties(sourceValue, custom.customProperties);

			if (resultValue === expectValue) {
				console.log(`PASS: ${sourceValue} => ${resultValue}`);
			} else {
				throw new Error(`Expected: ${expectValue}\nReceived: ${resultValue}`);
			}

			/* Test Custom Selectors */
			const sourceSelector = ':--any-heading + p {}';
			const expectSelector = 'h1 + p {},h2 + p {},h3 + p {},h4 + p {},h5 + p {},h6 + p {}';
			const resultSelector = utils.transformStringWithCustomSelectors(sourceSelector, custom.customSelectors);

			if (resultSelector === expectSelector) {
				console.log(`PASS: ${sourceSelector} => ${resultSelector}`);
			} else {
				throw new Error(`Expected: ${expectSelector}\nReceived: ${resultSelector}`);
			}
		}
	),

	/* Test Custom Media and Custom Properties from a JSON file */
	() => utils.readCustomFromJsonFile('./test/custom.json').then(
		custom => {
			/* Test Custom Media */
			const sourceParams = 'all and (--mq-a)';
			const expectParams = 'all and (max-width: 30em),all and (max-height: 30em)';
			const resultParams = utils.transformStringWithCustomMedia(sourceParams, custom.customMedia);

			if (resultParams === expectParams) {
				console.log(`PASS: ${sourceParams} => ${resultParams}`);
			} else {
				throw new Error(`Expected: ${expectParams}\nReceived: ${resultParams}`);
			}

			/* Test Custom Properties */
			const sourceValue = 'var(--length-4)';
			const expectValue = '25px';
			const resultValue = utils.transformStringWithCustomProperties(sourceValue, custom.customProperties);

			if (resultValue === expectValue) {
				console.log(`PASS: ${sourceValue} => ${resultValue}`);
			} else {
				throw new Error(`Expected: ${expectValue}\nReceived: ${resultValue}`);
			}

			/* Test Custom Selectors */
			const sourceSelector = ':--heading + p {}';
			const expectSelector = 'h1 + p {},h2 + p {},h3 + p {}';
			const resultSelector = utils.transformStringWithCustomSelectors(sourceSelector, custom.customSelectors);

			if (resultSelector === expectSelector) {
				console.log(`PASS: ${sourceSelector} => ${resultSelector}`);
			} else {
				throw new Error(`Expected: ${expectSelector}\nReceived: ${resultSelector}`);
			}
		}
	),

	/* Test Custom Media and Custom Properties from a PostCSS-processed string */
	() => postcss([() => {}]).process(
		`@custom-media --mq-a (max-width: 30em), (max-height: 30em);
		:root { --length-5: 10px }`,
		{ from: '<stdin>' }
	).then(
		({ root }) => utils.readCustomFromRoot(root)
	).then(
		custom => {
			/* Test Custom Media */
			const sourceParams = 'all and (--mq-a)';
			const expectParams = 'all and (max-width: 30em),all and (max-height: 30em)';
			const resultParams = utils.transformStringWithCustomMedia(sourceParams, custom.customMedia);

			if (resultParams === expectParams) {
				console.log(`PASS: ${sourceParams} => ${resultParams}`);
			} else {
				throw new Error(`Expected: ${expectParams}\nReceived: ${resultParams}`);
			}

			/* Test Custom Properties */
			const sourceValue = 'var(--length-5)';
			const expectValue = '10px';
			const resultValue = utils.transformStringWithCustomProperties(sourceValue, custom.customProperties);

			if (resultValue === expectValue) {
				console.log(`PASS: ${sourceValue} => ${resultValue}`);
			} else {
				throw new Error(`Expected: ${expectValue}\nReceived: ${resultValue}`);
			}
		}
	),

	() => Promise.resolve(
		utils.readCustomFromObject({
			customMedia: { '--mq-a': '(max-width: 30em), (max-height: 30em)' },
			customProperties: { '--length-0': '5px' },
			customSelectors: { ':--heading': 'h1, h2, h3' }
		})
	).then(
		custom => {
			return Promise.all([
				utils.writeCustom(custom, 'test/export.css'),
				utils.writeCustom(custom, 'test/export.js'),
				utils.writeCustom(custom, 'test/export.json'),
				utils.writeCustom(custom, 'test/export.mjs')
			]);
		}
	)
].reduce(
	(promise, test) => promise.then(test),
	Promise.resolve()
).catch(
	error => {
		console.error(error.message);

		process.exit(1);
	}
);
