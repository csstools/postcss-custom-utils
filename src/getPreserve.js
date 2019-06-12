import { isVoid } from './is';

export default function getPreserve (options) {
	return isVoid(Object(options).preserve) ? true : options.preserve;
}
