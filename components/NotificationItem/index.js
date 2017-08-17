import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableHighlight } from 'react-native';
import Avatar from '../Avatar';
import { markNotificationAsRead } from '../../services/api';
import * as templateService from '../../services/notification-templates';

const StyledView = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #dadee1;
`;

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
        // this.setState({ isRead: !this.state.isRead });
        markNotificationAsRead(id);
        onSelect();
    }

    render() {
        const { onSelect, type, id, visitedAt, actor } = this.props;
        const { logo } = actor;
        const { isRead } = this.state;

        return (
            <TouchableHighlight onPress={() => this.onSelectItem(onSelect, id)}>
                <StyledView style={{ backgroundColor: isRead ? 'white' : '#f0f4f9' }}>
                    <Avatar logoUrl={logo} />
                    <View>
                        <NotificationSentence {...this.props} />
                    </View>
                </StyledView>
            </TouchableHighlight>
        );
    }
}

function NotificationSentence(notification) {
    return (
        <Text>
            {templateService.transform(notification)}
        </Text>
    );
}
