import * as Notifications from 'expo-notifications';

export async function scheduleNotification(time: Date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '뮤다',
      body: '오늘 하루를 기록하면 뮤다가 음악을 추천해드릴게요!',
    },
    trigger: {
      hour: time.getHours(), // 알림이 보낼 시간 설정 (예: 오후 2시)
      minute: time.getMinutes(), // 알림이 보낼 분 설정
      repeats: true, // 반복 여부
    },
  });
}
