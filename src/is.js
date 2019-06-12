export function isFunction (value) {
	return typeof value === 'function';
}

export function isObject (value) {
	return value === Object(value);
}

export function isPromise (value) {
	return isObject(value) && isFunction(value.then);
}

export function isString (value) {
	return typeof value === 'string';
}

export function isVoid (value) {
	return value === undefined || value === null;
}
