import { Stack } from 'expo-router';
import HeaderRight from '@/components/diary/HeaderRight';
import HeaderRightDraft from '@/components/diary/HeaderRightDraft';
import HeaderTitle from '@/components/common/HeaderTitle';
import { COLORS } from '@/constants';
import CustomBackButton from '@/components/common/CustomBackButton';

export default function DiaryLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.BLACK,
        },
        headerTintColor: COLORS.WHITE,
        headerTitle: () => <HeaderTitle title="일기쓰기" />,
        headerRight: () => <HeaderRight />,
        headerLeft: () => <CustomBackButton />,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" options={{ headerLeft: () => null }} />
      <Stack.Screen name="write" />
      <Stack.Screen
        name="template"
        options={{
          headerTitle: () => <HeaderTitle title="템플릿 사용하기" />,
        }}
      />
      <Stack.Screen
        name="music"
        options={{
          headerTitle: () => <HeaderTitle title="음악 추천" />,
          headerLeft: () => null,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="draft"
        options={{
          headerTitle: () => <HeaderTitle title="저장목록" />,
          headerRight: () => <HeaderRightDraft />,
        }}
      />
      <Stack.Screen name="card" />
    </Stack>
  );
}
