import { Stack } from 'expo-router';
import HeaderRight from '@/components/diary/HeaderRight';
import HeaderRightDraft from '@/components/diary/HeaderRightDraft';
import HeaderTitle from '@/components/diary/HeaderTitle';
import Colors from '@/constants/Colors';

export default function DiaryLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
        headerTitle: () => <HeaderTitle title="일기쓰기" />,
        headerRight: () => <HeaderRight />,
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
          title: '일기쓰기',
          headerBackVisible: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="template"
        options={{
          title: '템플릿 사용하기',
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerTitle: () => <HeaderTitle title="템플릿 사용하기" />,
        }}
      />
      <Stack.Screen
        name="music"
        options={{
          title: '음악 추천',
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerTitle: () => <HeaderTitle title="음악 추천" />,
        }}
      />
      <Stack.Screen
        name="card"
        options={{
          title: '일기카드',
          headerBackVisible: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="draft"
        options={{
          title: '저장목록',
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerTitle: () => <HeaderTitle title="저장목록" />,
          headerRight: () => <HeaderRightDraft />,
        }}
      />
    </Stack>
  );
}
