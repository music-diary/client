import { Stack } from 'expo-router';

export default function LetterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Letter',
        }}
      />
    </Stack>
  );
}
