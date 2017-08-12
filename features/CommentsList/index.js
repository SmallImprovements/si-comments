import React from 'react';
import { withData } from 'ladda-react';
import CommentsList from './presenter';
import { getComments } from '../../services/api';
import { ActivityIndicator } from 'react-native';

const CommentsWithData = withData({
    resolve: {
        comments: ({ entityId, moduleType }) => {
            return getComments(entityId, moduleType);
        },
    },
    pendingComponent: () => <ActivityIndicator />,
})(CommentsList);

export default function AllCommentsWithData({ entityId, moduleType }) {
    return <CommentsWithData entityId={entityId} moduleType={moduleType} />;
}
