import readObject from './readObject';

/**
* Return Custom Variables from JSON
* @param {String} json
* @param {Object} options
* @return {Object} Custom Variables parsed from the JSON
*/

export default function readJSON (json) {
	return readObject(JSON.parse(json));
}
