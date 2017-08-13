import http from '../http';

const BASE_URL = '/api/v2';

export function getNotifications() {
	return http.get(`${BASE_URL}/notificationLogs/latest`).then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function getObjectiveById(objectiveId) {
	return http
		.get(`${BASE_URL}/objective-preview/${objectiveId}`)
		.then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function getObjectiveComments(objectiveId) {
	return http
		.get(`${BASE_URL}/objectives/${objectiveId}/messages`)
		.then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function getPraiseById(praiseId) {
	return http.get(`${BASE_URL}/praise/${praiseId}`).then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function getPraiseComments(praiseId) {
	return http
		.get(`${BASE_URL}/praise/${praiseId}/comments?fields=$message.list`)
		.then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function getComments(entityId, moduleType) {
	switch (moduleType) {
		case 'OBJECTIVE':
			return getObjectiveComments(entityId);
		case 'MESSAGE':
			return getPraiseComments(entityId);
		case 'PRAISE':
			return getPraiseComments(entityId);
		default:
			throw new Error('No valid  moduleType provided');
	}
}

export function postPraiseComment(praiseId, data) {
	console.log(praiseId, data);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const dto = {
		masterMessageId: praiseId,
		message: data.comment,
		title: 'Re: sdfdf',
		visibleTo: [],
	};
	return http
		.post(`${BASE_URL}/praise/${praiseId}/comments`, dto, config)
		.then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function postObjectiveComment(objectiveId, data) {
	console.log(objectiveId, data);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const dto = {
		masterMessageId: objectiveId,
		message: data,
		title: 'Re: sdfdf',
		visibleTo: [],
	};
	// "/objective-cycles/{cycleId}/objectives/{id}/messages"
	return http.post(`${BASE_URL}/objective-cycles/${cycleId}/objectives/${objectiveId}/messages`, dto, config).then(
		res => {
			// console.log(res);
			return res.data;
		},
		err => {
			console.log(err);
		}
	);
}

export function postComment({ moduleType, entityId, data }) {
	switch (moduleType) {
		case 'OBJECTIVE':
			return postObjectiveComment(entityId, data);
		case 'MESSAGE':
			return postPraiseComment(entityId, data);
		case 'PRAISE':
			return postPraiseComment(entityId, data);
		default:
			throw new Error('No valid  moduleType provided to postComment');
	}
}
