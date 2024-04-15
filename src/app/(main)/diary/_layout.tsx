import { Stack } from 'expo-router';
import HeaderTitle from '@/components/diary/HeaderTitle';
import Colors from '@/constants/Colors';
import HeaderCloseButton from '@/components/diary/HeaderCloseButton';

export default function DiaryLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTitle: '',
        headerLeft: () => <HeaderTitle />,
        headerRight: () => <HeaderCloseButton />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '일기쓰기',
        }}
      />
    </Stack>
  );
}
