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

export function readJSON (from) {
	return readFile(from).then(
		data => JSON.parse(data)
	);
}

export function writeFile (to, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(to, data, error => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}
