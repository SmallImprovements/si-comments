import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableHighlight } from 'react-native';
import Avatar from '../Avatar';
import { markNotificationAsRead } from '../../services/api';
import * as templateService from '../../services/notification-templates';
import ModuleIcon from '../ModuleIcon';
import styleVars from '../../assets/styles/vars';
import colorVars from '../../assets/styles/colours';
import DateDisplay from '../DateDisplay';

const { standardPadding, subduedTextColor } = styleVars;
const { SIGray4 } = colorVars;
const StyledView = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border-bottom-width: 1px;
    border-color: #dadee1;
`;

const NotificationSentence = styled.View`
    flex-shrink: 1;
    margin-left: ${standardPadding * 0.5}px;
`;

const NotificationDate = styled(DateDisplay)`
    margin-left: ${standardPadding * 0.25}px;
    color: ${subduedTextColor};
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
        markNotificationAsRead(id);
        onSelect();
        this.setState({ isRead: !this.state.isRead });
    }

    render() {
        const { onSelect, id, actor, module, createdAt } = this.props;
        const { logo } = actor;
        const { isRead } = this.state;

        return (
            <TouchableHighlight onPress={() => this.onSelectItem(onSelect, id)}>
                <StyledView style={{ backgroundColor: isRead ? 'white' : '#f0f4f9' }}>
                    <Avatar logoUrl={logo} />
                    <NotificationSentence>
                        <Text>{templateService.transform(this.props)}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: standardPadding * 0.125 }}>
                            <ModuleIcon type={module} />
                            <NotificationDate date={createdAt} />
                        </View>
                    </NotificationSentence>
                </StyledView>
            </TouchableHighlight>
        );
    }
}
