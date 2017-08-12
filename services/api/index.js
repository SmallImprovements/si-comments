import http from '../http';

const BASE_URL = '/api/v2';

export function getNotifications() {
	return http.get(`${BASE_URL}/notificationLogs/latest`).then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function getObjectiveById(id) {
	return http.get(`${BASE_URL}/objective-preview/${id}`).then(res => res.data, err => ({ err, status: 'ERROR' }));
}
