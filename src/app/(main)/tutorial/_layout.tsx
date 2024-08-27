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
    </Stack>
  );
};

export default LoginLayout;
