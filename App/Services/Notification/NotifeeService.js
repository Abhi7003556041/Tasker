import notifee, { EventType } from '@notifee/react-native';
import NavigationService from '../Navigation';
async function onDisplayNotification(title, body) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'resturentwalaz_owner',
        name: 'ResturentWalazOwner',
        sound: 'default'
    });

    // Display a notification
    await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId,
            smallIcon: 'ic_launcher',
            pressAction: {
                id: 'default',
            },
        },
    });
}
const onNotification = (notify) => {
    console.log('[App] onNotification', notify);
    onDisplayNotification(notify.notification.title, notify.notification.body)
  };

  const onOpenNotification = async (notify) => {
    console.log('notifydataaa>>>>', notify);

    let notiData = notify?.data
    onclickNotification(notiData)
  };
  const onclickNotification = (data) => {
    console.log('data--1323----------', data)
    // if (data.type == 'Food Order') {
    //   NavigationService.navigate('Order')
    // } else if (data.type == 'Table Booking') {
    //   NavigationService.navigate('Reservation')
    // }
    NavigationService.navigate('DrawerTask')

  }
  const onForegroundEvent = (data) => {
    // console.log("data", data)
    const { type, detail } = data;
    if (type == EventType.PRESS) {
      let notiData = detail?.notification?.data
      onclickNotification(notiData)
    }
  }

export { onDisplayNotification ,onNotification ,onOpenNotification,onForegroundEvent };