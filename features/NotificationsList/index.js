import React, { Component } from 'react';
import { Notifications } from 'expo';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, Button, TouchableOpacity } from 'react-native';
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
        };

        this.onSelect = this.onSelect.bind(this);
    }

    doGetNotifications() {
        return getNotifications().then(res => {
            this.setState({
                dataSource: this.filterTheNotifications(res),
            });
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
        return {
            dataSource: this.doGetNotifications(),
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
        const { dataSource } = this.state;

        if (!dataSource) {
            return <ActivityIndicator />;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
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
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
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
