import React from 'react';
import { View, Text, Image, Alert, TouchableHighlight } from 'react-native';
import Card from '../Card';
import ObjectivePreviewWithData from './ObjectivePreview';
import PraisePreviewWithData from './PraisePreview';

export default function EntityPreview({ type, entityId }) {
    switch (type) {
        case 'OBJECTIVE':
            return <ObjectivePreviewWithData entityId={entityId} />;
        case 'PRAISE':
            return <PraisePreviewWithData entityId={entityId} />;
        default:
            return <PraisePreviewWithData entityId={entityId} />;
    }
}
