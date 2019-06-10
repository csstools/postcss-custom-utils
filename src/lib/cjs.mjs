import fs from 'fs';
import Module from 'module';
import path from 'path';

export default Object.defineProperties({}, {
	__dirname: {
		get: _dirname
	},
	__filename: {
		get: _filename
	},
	require: {
		get: () => _require
	},
	resolve: {
		get: () => _require
	}
});

// return the current filename in cjs and esm environments
function _filename () {
	return typeof module === 'undefined'
		? Error().stack.replace(/^[\W\w]*:\/\/([^:]+)[\W\w]*$/, '$1')
	: (module.parent || module).filename;
}

// return the current dirname in cjs and esm environments
function _dirname () {
	return _filename().replace(/\/[^/]*$/, '');
}

// return the resolved id
function _resolve (id, from) {
	// get the resolved filename conditionally using `from`
	const filename = from ? path.resolve(_dirname(), from, 'noop.js') : _filename();

	// get the resolved dirname using `filename`
	const dirname = path.dirname(filename);

	// get all module paths from the filename
	const paths = Module._nodeModulePaths(dirname);

	// return the resolved filename
	return Module._resolveFilename(id, { id: filename, filename, paths });
}

// require the resolved id
function _require (id, from) {
	// get the resolved filename using `id` and conditionally using `from`
	const filename = _resolve(id, from);

	// get the resolved dirname using `filename`
	const dirname = path.dirname(filename);

	// get the code of `filename`
	const code = fs.readFileSync(filename, 'utf8');

	// get the module paths from `dirname`
	const paths = Module._nodeModulePaths(dirname);

	// create a new module with the assigned filename and paths
	const m = Object.assign(new Module(filename), { filename, paths });

	// compile the module
	m._compile(code, filename);

	// return the exports of the module
	return m.exports;
}
