import { Stack } from 'expo-router';

export default function ArchiveLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Archive',
        }}
      />
    </Stack>
  );
}
