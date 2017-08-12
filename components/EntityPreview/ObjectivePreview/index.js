import React from 'react';
import { withData } from 'ladda-react';
import ObjectivePreview from './presenter';
import { getObjectiveById } from '../../../services/api';
import { ActivityIndicator } from 'react-native';

const PreviewWithData = withData({
	resolve: {
		objective: ({ entityId }) => {
			return getObjectiveById(entityId);
		},
	},
	pendingComponent: () => <ActivityIndicator />,
})(ObjectivePreview);

export default function ObjectivePreviewWithData({ entityId }) {
	return <PreviewWithData entityId={entityId} />;
}
