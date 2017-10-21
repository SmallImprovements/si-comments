import { Permissions, Notifications } from 'expo';
import auth from '../auth';
import { AsyncStorage } from 'react-native';

async function registerForPushNotificationsAsync() {
  const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  let deviceId = await Notifications.getExpoPushTokenAsync();

  return auth
    .registerDeviceId(deviceId)
    .then(res => res, err => err)
    .then(storeDeviceIdLocally(deviceId));
}

function storeDeviceIdLocally(deviceId) {
  AsyncStorage.setItem('deviceId', deviceId).done();
}
export default registerForPushNotificationsAsync;
