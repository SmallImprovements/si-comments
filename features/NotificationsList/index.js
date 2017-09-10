import React, { Component } from 'react';
import { Notifications } from 'expo';
import { View, ListView, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { NotificationItem } from '../../components/NotificationItem';
import { filterNotifications } from '../../services/notifications';
import { getNotifications } from '../../services/api';
import styled from 'styled-components/native';
import styleVars from '../../assets/styles/vars';

const { subduedTextColor } = styleVars;
const NoNotificationsText = styled.Text`
    color: ${subduedTextColor};
    margin: 20px 0;
    text-align: center;
`;
export default class NotificationsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            dataSource: null,
        };

        this.onSelect = this.onSelect.bind(this);
    }

    doGetNotifications() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        return getNotifications().then(res => {
            this.setState({
                dataSource: ds.cloneWithRows(this.filterTheNotifications(res)),
            });
            // this.setState({ dataSource: ds.cloneWithRows(res) });
        });
    }

    filterTheNotifications(notifications) {
        return filterNotifications(notifications);
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.doGetNotifications().then(() => {
            this.setState({ refreshing: false });
        });
    }

    onSelect(navigation, rowData) {
        navigation.navigate('EntityCommentView', {
            moduleType: rowData.module,
            entityId: rowData.entityId,
        });
    }

    componentDidMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        return {
            dataSource: ds.cloneWithRows(this.doGetNotifications()),
        };
    }

    _handleNotification = () => {
        this.doGetNotifications();
    };

    componentWillMount() {
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    // componentWillUnmount() {
    //   Notifications.removeListener(this._handleNotification);
    // }
    render() {
        const { navigation } = this.props;
        const { dataSource } = this.state;

        if (!dataSource) {
            return <ActivityIndicator />;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {dataSource.getRowCount() ? (
                    <ListView
                        navigation={navigation}
                        dataSource={this.state.dataSource}
                        style={{ backgroundColor: '#fff', height: '100%' }}
                        renderRow={rowData => {
                            return (
                                <NotificationItem
                                    key={rowData.id}
                                    onSelect={() => this.onSelect(navigation, rowData)}
                                    {...rowData}
                                />
                            );
                        }}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                        }
                    />
                ) : (
                    <NoNotificationsText>You have no Notifications</NoNotificationsText>
                )}
            </View>
        );
    }
}

NotificationsList.navigationOptions = () => {
    return {
        title: 'Notifications',
    };
};
