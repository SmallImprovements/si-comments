import http from '../http';

const BASE_URL = '/api/v2';
const DEFAULT_HEADERS = {
    headers: {
        'Content-Type': 'application/json',
    },
};

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

export function postPraiseComment(praiseId, comment) {
    const dto = {
        masterMessageId: praiseId,
        message: comment,
        title: 'Re: sdfdf',
        visibleTo: [],
    };
    return http
        .post(`${BASE_URL}/praise/${praiseId}/comments`, dto, DEFAULT_HEADERS)
        .then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function postObjectiveComment(objectiveId, comment) {
    const dto = {
        author: '',
        message: comment,
        objectiveId: objectiveId,
        title: 'Feebdack about objective:',
        visibleTo: [],
    };
    return http
        .post(`${BASE_URL}/objectives/${objectiveId}/messages`, dto, DEFAULT_HEADERS)
        .then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function postComment({ moduleType, entityId, comment }) {
    switch (moduleType) {
        case 'OBJECTIVE':
            return postObjectiveComment(entityId, comment);
        case 'MESSAGE':
            return postPraiseComment(entityId, comment);
        case 'PRAISE':
            return postPraiseComment(entityId, comment);
        default:
            throw new Error('No valid  moduleType provided to postComment');
    }
}

export function deletePraiseComment(praiseId, commentId) {
    return http
        .delete(`${BASE_URL}/praise/${praiseId}/comments/${commentId}`, null, DEFAULT_HEADERS)
        .then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function deleteObjectiveComment(objectiveId, commentId) {
    return http
        .delete(`${BASE_URL}/objectives/${objectiveId}/messages/${commentId}`, null, DEFAULT_HEADERS)
        .then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function markNotificationAsRead(id) {
    return http
        .post(`${BASE_URL}/notificationLogs/markAsRead/${id}`, null, DEFAULT_HEADERS)
        .then(res => res.data, err => ({ err, status: 'ERROR' }));
}

export function likePraise(id) {
    return http.put(`${BASE_URL}/praise/${id}/upvote`, null, DEFAULT_HEADERS);
}

export function unlikePraise(id) {
    return http.put(`${BASE_URL}/praise/${id}/downvote`, null, DEFAULT_HEADERS);
}
