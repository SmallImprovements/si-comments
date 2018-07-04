import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Avatar from '../Avatar';
import { markNotificationAsRead } from '../../services/api';
import * as templateService from '../../services/notification-templates';
import ModuleIcon from '../ModuleIcon';

import Container from './styled/Container';
import TextContent from './styled/TextContent';
import NotificationDate, { NotificationDateContainer } from './styled/NotificationDate';

export class NotificationItem extends React.Component {
    constructor(props) {
        super(props);
        const { visitedAt } = props;
        this.state = {
            isRead: !!visitedAt,
        };
        this.onSelectItem = this.onSelectItem.bind(this);
    }

    onSelectItem(onSelect, id) {
        markNotificationAsRead(id);
        onSelect();
        this.setState({ isRead: true });
    }

    render() {
        const { onSelect, id, actor, module, createdAt } = this.props;
        const { logo } = actor;
        const { isRead } = this.state;

        return (
            <TouchableHighlight onPress={() => this.onSelectItem(onSelect, id)}>
                <Container style={{ backgroundColor: isRead ? 'white' : '#f0f4f9' }}>
                    <Avatar logoUrl={logo} />
                    <TextContent>
                        <Text>{templateService.transform(this.props)}</Text>
                        <NotificationDateContainer>
                            <ModuleIcon type={module} />
                            <NotificationDate date={createdAt} />
                        </NotificationDateContainer>
                    </TextContent>
                </Container>
            </TouchableHighlight>
        );
    }
}
