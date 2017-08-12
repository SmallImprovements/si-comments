import React, { Component } from 'react';
import { ListView, Text } from 'react-native';
import { NotificationItem } from '../../components/NotificationItem';
import { filterNotifications } from '../../services/notifications';

export default class NotificationsList extends Component {
    constructor(props) {
        super(props);
        const { notifications } = this.props;
        const filteredNotifications = filterNotifications(notifications);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(filteredNotifications),
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(navigation, rowData) {
        navigation.navigate('EntityCommentView', {
            moduleType: rowData.module,
            entityId: rowData.entityId,
        });
    }
    render() {
        const { navigation } = this.props;
        return (
            <ListView
                navigation={navigation}
                dataSource={this.state.dataSource}
                style={{ backgroundColor: '#fff' }}
                renderRow={rowData => {
                    return (
                        <NotificationItem
                            key={rowData.id}
                            text={rowData.type}
                            onSelect={() => this.onSelect(navigation, rowData)}
                        />
                    );
                }}
            />
        );
    }
}

NotificationsList.navigationOptions = ({ navigation, screenProps }) => {
    return {
        title: 'Notifications',
    };
};
