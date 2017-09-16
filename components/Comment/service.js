import { deletePraiseComment, deleteObjectiveComment } from '../../services/api';
import { Alert } from 'react-native';

export function doDeleteComment({ masterEntityId, id, moduleType, doGetComments }) {
    if (moduleType === 'OBJECTIVE') {
        return deleteObjectiveComment(masterEntityId, id).then(
            res => handleResponse(res, doGetComments),
            err => handleError(err)
        );
    }
    return deletePraiseComment(masterEntityId, id).then(
        res => handleResponse(res, doGetComments),
        err => handleError(err)
    );
}

function handleResponse(res, doGetComments) {
    checkForError(res);
    doGetComments();
    return res;
}

function handleError(err) {
    console.log('error deleting comment', err);
}

function checkForError(res) {
    return res.status === 'ERROR' && showErrorAlert(res.err);
}
function showErrorAlert(err) {
    Alert.alert("Can't delete comment", `${err}`, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
        cancelable: true,
    });
}
