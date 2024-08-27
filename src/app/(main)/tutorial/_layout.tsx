import { Stack } from 'expo-router';

const LoginLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="second-tutorial" />
    </Stack>
  );
};

export default LoginLayout;
