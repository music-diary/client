import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ animation: 'fade', headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="diary-limit" />
    </Stack>
  );
}
