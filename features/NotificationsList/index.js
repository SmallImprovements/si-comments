import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Notifications } from 'expo';
import { View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NotificationItem } from '../../components/NotificationItem';
import { filterNotifications } from '../../services/notifications';
import { getNotifications } from '../../services/api';
import styleVars from '../../assets/styles/vars';
import Avatar from '../../components/Avatar';
import NoContent from '../../components/NoContent';

import Container from './styled/Container';
import List from './styled/List';

const { navigationBorderColor } = styleVars;

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
            return (
                <Container>
                    <ActivityIndicator />
                </Container>
            );
        }
        return (
            <Container>
                {dataSource.length ? (
                    <List
                        navigation={navigation}
                        data={dataSource}
                        renderItem={({ item }) => {
                            return <NotificationItem onSelect={() => this.onSelect(navigation, item)} {...item} />;
                        }}
                        keyExtractor={item => item.id}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                        }
                    />
                ) : (
                    <NoContent>You have no Notifications</NoContent>
                )}
            </Container>
        );
    }
}

NotificationsList.navigationOptions = ({ navigation, screenProps }) => {
    const { currentUser } = screenProps;
    const baseNavOptions = {
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

    const androidNavOptions = {
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: navigationBorderColor,
        },
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 14,
        },
    };
    const isAndroid = Platform.OS === 'android';

    return isAndroid
        ? {
              ...baseNavOptions,
              ...androidNavOptions,
          }
        : baseNavOptions;
};
