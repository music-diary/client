import { Redirect } from 'expo-router';

export default function TabOneScreen() {
  // redirect to home folder
  return <Redirect href={'/(main)/home/'} />;
}
