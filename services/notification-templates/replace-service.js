import React from 'react';
import * as InflectionService from './inflection';
import { Text } from 'react-native';

export function transformSentence(text, values) {
	text = resolveReplacements(text);
	text = InflectionService.fixArticle(text);
	return replace(text, values);
}

const mockReplacements = {
	'objective.singular.big': 'Objective',
	'praise.singular.big': 'Praise',
};

function replacement(key) {
	return mockReplacements[key] || key;
}

function resolveReplacements(template) {
	const pattern = /:(.*?):/i;
	const match = template.match(pattern);
	if (!match) {
		return template;
	}
	const replaceable = match[0];
	const replacementKey = match[1];
	return template.replace(replaceable, replacement(replacementKey));
}

function replace(template, replacements) {
	const pattern = /(?:(.*?){{(.*?)}}|(.+))/g;
	const result = [];
	let count = 0;
	template.replace(pattern, function(match, group1, placeholder, group3) {
		if (group1) {
			result.push(React.createElement(Text, { key: count++ }, group1));
		}
		if (placeholder) {
			const value = replacements[placeholder] || '';
			result.push(getReplacedDomNode(value, count++));
		}
		if (group3) {
			result.push(React.createElement(Text, { key: count++ }, group3));
		}
		return 'some string';
	});

	return result;
}

function getReplacedDomNode(value, key) {
	return React.createElement(Text, { key }, value);
}
