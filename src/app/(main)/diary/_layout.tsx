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
        headerTintColor: Colors.white,
        headerTitle: '',
        headerLeft: () => <HeaderTitle title="일기쓰기" />,
        headerRight: () => <HeaderCloseButton />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '일기쓰기',
        }}
      />
      <Stack.Screen
        name="write"
        options={{
          headerBackVisible: true,
          title: '일기쓰기',
        }}
      />
      <Stack.Screen
        name="template"
        options={{
          headerBackVisible: true,
          title: '템플릿 사용하기',
          headerLeft: () => <HeaderTitle title="템플릿 사용하기" />,
        }}
      />
    </Stack>
  );
}
