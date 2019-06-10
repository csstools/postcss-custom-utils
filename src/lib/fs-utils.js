import fs from 'fs';

export function readFile (from) {
	return new Promise((resolve, reject) => {
		fs.readFile(from, 'utf8', (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	});
}

export function readFileSync (from) {
	return fs.readFileSync(from, 'utf8');
}

export function readJson (from) {
	return readFile(from).then(
		data => JSON.parse(data)
	);
}

export function readJsonSync (from) {
	return JSON.parse(
		fs.readFileSync(from, 'utf8')
	);
}

export function writeFile (to, data) {
	return new Promise(
		(resolve, reject) => fs.writeFile(
			to,
			data,
			error => error ? reject(error) : resolve()
		)
	);
}

export function writeFileSync (to, data) {
	return fs.writeFileSync(to, data);
}
