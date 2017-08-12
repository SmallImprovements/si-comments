import React from 'react';
import { View, Text, Image, Alert, TouchableHighlight } from 'react-native';
import Card from '../Card';
import ObjectivePreviewWithData from './ObjectivePreview';

const ENTITY_TYPES = ['OBJECTIVE', 'PRAISE'];
export default function EntityPreview({ entity, type, entityId }) {
    switch (type) {
        case 'OBJECTIVE':
            return <ObjectivePreviewWithData entityId={entityId} />;
        case 'PRAISE':
            return <PraisePreview {...entity} />;
        default:
            return <PraisePreview {...entity} />;
    }
}

function PraisePreview({ title, author }) {
    return (
        <Card>
            <Text>Praise</Text>
        </Card>
    );
}

