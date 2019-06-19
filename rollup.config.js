import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	output: [
		{ file: 'index.cjs.js', format: 'cjs', sourcemap: true },
		{ file: 'index.esm.mjs', format: 'esm', sourcemap: true }
	],
	plugins: [
		babel({
			presets: [
				['@babel/env', { targets: { node: 8 } }]
			]
		})
	]
};
