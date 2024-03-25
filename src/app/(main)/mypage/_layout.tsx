import { Stack } from 'expo-router';

export default function MypageLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Mypage',
        }}
      />
    </Stack>
  );
}
