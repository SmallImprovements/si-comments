import * as helper from './helper';
// function createMessageTemplate(fragment) {
// 	return {
// 		chooseTemplate: item => ({
// 			text: `${getDefaultActorPhrase(item)} ${fragment}`,
// 			getValuesFrom: getDefaultValues,
// 		}),
// 	};
// }

function createPraiseTemplate(fragment) {
	return {
		chooseTemplate: item => ({
			text: `${getDefaultActorPhrase(item)} ${fragment}`,
			getValuesFrom: getDefaultValues,
		}),
	};
}
function getDefaultValues(item) {
	return {
		actor: helper.transformActorName(item.actor),
		otherActor: item.otherActor ? helper.transformActorName(item.otherActor) : null,
		additionalActorsCount: item.additionalActorsCount,
		repetition: getRepetitionPhrase(item.repetitionCount),
		possPron: helper.asPossessivePronoun(item.actor.gender),
	};
}

function getDefaultActorPhrase(item) {
	if (item.otherActor) {
		return '{{actor}} and {{otherActor}}';
	}

	if (item.additionalActorsCount) {
		return '{{actor}} and {{additionalActorsCount}} others';
	}

	if (!item.aggregateOverActors) {
		return '{{actor}}';
	}
}
function getRepetitionPhrase(repetitionCount) {
	if (repetitionCount === 0) {
		return '';
	}
	if (repetitionCount === 1) {
		return 'twice ';
	}
	return `${repetitionCount} times `;
}

const TEMPLATES = {
	// MESSAGE_COMMENT_FOR_AUTHOR: createMessageTemplate('commented on a :messages.singular: you wrote.'),
	// MESSAGE_COMMENT_FOR_RECIPIENT: createMessageTemplate('commented on a :messages.singular: about you.'),
	// MESSAGE_COMMENT_MENTIONED_YOU: createMessageTemplate('mentioned you in a comment on a :messages.singular:.'),

	PRAISE_COMMENT_FOR_AUTHOR: createPraiseTemplate('commented on a :praise.singular.big: you wrote.'),
	PRAISE_COMMENT_FOR_RECIPIENT: createPraiseTemplate('commented on a :praise.singular.big: for you.'),
	PRAISE_COMMENT_MENTIONED_YOU: createPraiseTemplate('mentioned you in a comment on a :praise.singular.big:.'),

	OBJECTIVE_COMMENT_CREATED_FOR_OWNER: {
		standard: {
			text: '{{actor}} commented on your :objective.singular.big:.',
			getValuesFrom: function(item) {
				return {
					actor: helper.transformActorName(item.actor),
				};
			},
		},
	},
};

export default TEMPLATES;