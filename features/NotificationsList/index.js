import React, { Component } from 'react';
import { Notifications } from 'expo';
import { concat } from 'lodash';
import { View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { NotificationItem } from '../../components/NotificationItem';
import { filterNotifications } from '../../services/notifications';
import { getNotifications } from '../../services/api';
import styled from 'styled-components/native';
import styleVars from '../../assets/styles/vars';
import Avatar from '../../components/Avatar';

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
            lastUpdatedNotificationsCount: 0,
        };

        this.onSelect = this.onSelect.bind(this);
    }

    doGetNotifications({ offset, limit }) {
        const { dataSource, lastUpdatedNotificationsCount } = this.state;
        return getNotifications({ offset, limit }).then(res => {
            if (!res) {
                return;
            }
            /*
             Horrible hack because we're currently filtering 
             out certain notifications, so we need to keep track 
             of the original count of unfiltered notifications
             */
            const newUpdatedNotificationsCount = lastUpdatedNotificationsCount + res.length;

            const filteredNotifications = this.filterTheNotifications(res);

            // If new notifications have been retrieved, combine them
            const notifications = concat(dataSource || [], filteredNotifications);

            this.setState({
                dataSource: notifications,
                lastUpdatedNotificationsCount: newUpdatedNotificationsCount,
            });
        });
    }

    filterTheNotifications(notifications) {
        return filterNotifications(notifications);
    }

    onRefresh({ offset, limit }) {
        this.setState({ refreshing: true });
        this.doGetNotifications({ offset, limit }).then(() => {
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
        return {
            dataSource: this.doGetNotifications({ offset: 0, limit: 30 }),
        };
    }

    _handleNotification = () => {
        this.doGetNotifications();
    };

    componentWillMount() {
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    componentWillUnmount() {
        // Notifications.removeListener(this._handleNotification);
        this._notificationSubscription.remove();
    }
    render() {
        const { navigation } = this.props;
        const { dataSource, lastUpdatedNotificationsCount } = this.state;
        console.log('lastUpdatedNotificationsCount', lastUpdatedNotificationsCount);
        if (!dataSource) {
            return <ActivityIndicator />;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', height: 50 }}>
                {dataSource.length ? (
                    <FlatList
                        navigation={navigation}
                        data={dataSource}
                        style={{ backgroundColor: '#fff', height: '100%' }}
                        renderItem={({ item }) => {
                            return <NotificationItem onSelect={() => this.onSelect(navigation, item)} {...item} />;
                        }}
                        keyExtractor={item => item.id}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this, { offset: 0, limit: 30 })}
                            />
                        }
                        onEndReachedThreshold={20}
                        onEndReached={() => {
                            this.doGetNotifications({ offset: lastUpdatedNotificationsCount + 1, limit: 1 });
                        }}
                        ListFooterComponent={<Text>No more notifications... only fetching 30</Text>}
                    />
                ) : (
                    <NoNotificationsText>You have no Notifications</NoNotificationsText>
                )}
            </View>
        );
    }
}

NotificationsList.navigationOptions = ({ navigation, screenProps }) => {
    const { currentUser } = screenProps;
    return {
        title: 'Notifications',
        headerRight: (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Settings');
                }}
                style={{ marginRight: 10 }}
            >
                <Avatar logoUrl={currentUser.logo} />
            </TouchableOpacity>
        ),
    };
};
