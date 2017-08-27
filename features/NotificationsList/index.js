import React, { Component } from 'react';
import { Notifications } from 'expo';
import { View, ListView, RefreshControl, ActivityIndicator } from 'react-native';
import { NotificationItem } from '../../components/NotificationItem';
import { filterNotifications } from '../../services/notifications';
import { getNotifications } from '../../services/api';
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
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return getNotifications().then(res => {
      this.setState({ dataSource: ds.cloneWithRows(this.filterTheNotifications(res)) });
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
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
  render() {
    const { navigation } = this.props;
    const { dataSource } = this.state;
    return (
      <View>
        {dataSource
          ? <ListView
              navigation={navigation}
              dataSource={this.state.dataSource}
              style={{ backgroundColor: '#fff', height: '100%' }}
              renderRow={rowData => {
                return (
                  <NotificationItem key={rowData.id} onSelect={() => this.onSelect(navigation, rowData)} {...rowData} />
                );
              }}
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
              }
            />
          : <ActivityIndicator />}
      </View>
    );
  }
}

NotificationsList.navigationOptions = () => {
  return {
    title: 'Notifications',
  };
};
