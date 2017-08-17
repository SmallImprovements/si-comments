import http from '../http';
import { Permissions, Notifications } from 'expo';
const PUSH_ENDPOINT = '/api/v2/notificationLogs/push-token/12345';

async function registerForPushNotificationsAsync() {
  const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  console.log('Push notifications check entered');
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to our backend so we can use it to send pushes from there
  http.defaults.baseURL = 'http://192.168.1.25:8080';
  return http
    .post(PUSH_ENDPOINT, {
      params: { token: token },
    })
    .then(res => {
      console.log('Successfully hit Push Token endppoint');
      return res.data;
    });
}
export default registerForPushNotificationsAsync;
