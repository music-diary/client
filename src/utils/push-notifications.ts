import * as Notifications from 'expo-notifications';

export async function scheduleNotification(time: Date) {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  if (scheduledNotifications.length > 0) {
    for (const notification of scheduledNotifications) {
      await Notifications.cancelScheduledNotificationAsync(
        notification.identifier,
      );
    }
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '뮤다',
      body: '오늘 하루를 기록하면 뮤다가 음악을 추천해드릴게요!',
    },
    trigger: {
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeats: true,
    },
  });
}
