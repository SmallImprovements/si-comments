import React from 'react';
import { withData } from 'ladda-react';
import PraisePreview from './presenter';
import { getPraiseById } from '../../../services/api';
import { ActivityIndicator } from 'react-native';

const PreviewWithData = withData({
	resolve: {
		praise: ({ entityId }) => {
			return getPraiseById(entityId);
		},
	},
	pendingComponent: () => <ActivityIndicator />,
})(PraisePreview);

export default function PraisePreviewWithData({ entityId }) {
	return <PreviewWithData entityId={entityId} />;
}
