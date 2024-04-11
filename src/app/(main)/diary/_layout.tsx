import { Stack } from 'expo-router';

export default function DiaryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Diary',
        }}
      />
    </Stack>
  );
}
