import { filter, values, includes } from 'lodash';

const TYPES_ALLOWED = {
	MESSAGE_COMMENT_FOR_AUTHOR: 'MESSAGE_COMMENT_FOR_AUTHOR',
	MESSAGE_COMMENT_FOR_RECIPIENT: 'MESSAGE_COMMENT_FOR_RECIPIENT',
	MESSAGE_COMMENT_MENTIONED_YOU: 'MESSAGE_COMMENT_MENTIONED_YOU',
	PRAISE_COMMENT_FOR_AUTHOR: 'PRAISE_COMMENT_FOR_AUTHOR',
	PRAISE_COMMENT_FOR_RECIPIENT: 'PRAISE_COMMENT_FOR_RECIPIENT',
	PRAISE_COMMENT_MENTIONED_YOU: 'PRAISE_COMMENT_MENTIONED_YOU',
	OBJECTIVE_COMMENT_CREATED_FOR_OWNER: 'OBJECTIVE_COMMENT_CREATED_FOR_OWNER',
	PRAISE_RECEIVED: 'PRAISE_RECEIVED',
	OBJECTIVE_CREATED_FOR_YOU: 'OBJECTIVE_CREATED_FOR_YOU',
};

export function filterNotifications(notifications) {
	return filter(notifications, o => includes(values(TYPES_ALLOWED), o.type));
}
