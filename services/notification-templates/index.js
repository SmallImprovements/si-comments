import * as replaceService from './replace-service';
import TEMPLATES from './templates';

function isSupported({ type }) {
	return !!TEMPLATES[type];
}

function findTemplate(notification) {
	const { type } = notification;
	if (!isSupported({ type })) {
		return;
	}
	const tpl = TEMPLATES[type];

	if (tpl.chooseTemplate) {
		return tpl.chooseTemplate(notification);
	}
	return tpl.standard;
}

export function transform(notification) {
	const template = findTemplate(notification);
	if (!template) {
		return;
	}
	let { text, getValuesFrom } = template;
	try {
		const templateValues = getValuesFrom ? getValuesFrom(notification) : {};
		return replaceService.transformSentence(text, templateValues);
	} catch (e) {
		return;
	}
}
