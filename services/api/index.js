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
	console.log(moduleType);
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
