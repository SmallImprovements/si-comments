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

export function getPraiseById(praiseId) {
	return http.get(`${BASE_URL}/praise/${praiseId}`).then(res => res.data, err => ({ err, status: 'ERROR' }));
}
