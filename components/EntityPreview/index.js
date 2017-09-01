import React from 'react';
import Card from '../Card';
import ObjectivePreviewWithData from './ObjectivePreview';
import PraisePreviewWithData from './PraisePreview';

export default function EntityPreview({ moduleType, entityId }) {
    return (
        <Card style={{ minHeight: 80 }}>
            {chooseTemplate(moduleType, entityId)}
        </Card>
    );
}

function chooseTemplate(moduleType, entityId) {
    switch (moduleType) {
        case 'OBJECTIVE':
            return <ObjectivePreviewWithData entityId={entityId} />;
        case 'MESSAGE':
            return <PraisePreviewWithData entityId={entityId} />;
        case 'PRAISE':
            return <PraisePreviewWithData entityId={entityId} />;
        default:
            throw new Error('No ModuleType provided to EntityPreview');
    }
}
