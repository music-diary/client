import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import HeaderTitle from '@/components/common/HeaderTitle';
import Colors from '@/constants/Colors';
import CustomBackButton from '@/components/common/CustomBackButton';
import HeaderRightMore from '@/components/archive/HeaderRightMore';

export default function ArchiveLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
        headerTitle: '',
        headerLeft: () => <HeaderTitle title="아카이브" />,
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '아카이브',
        }}
      />
      {/* <Stack.Screen
        name="month/[month]"
        options={{
          title: '월별 아카이브',
          headerLeft: () => (
            <View style={styles.headerContainer}>
              <CustomBackButton />
              <HeaderTitle title="아카이브" />
            </View>
          ),
        }}
      /> */}
      <Stack.Screen
        name="day/[day]"
        options={{
          title: '일별 아카이브',
          headerLeft: () => (
            <View style={styles.headerContainer}>
              <CustomBackButton />
              <HeaderTitle title="아카이브" />
            </View>
          ),
          headerRight: () => <HeaderRightMore />,
          animation: 'slide_from_right',
        }}
      />
      {/* <Stack.Screen
        name="calendar"
        options={{
          title: '캘린더',
          headerLeft: () => (
            <View style={styles.headerContainer}>
              <CustomBackButton />
              <HeaderTitle title="아카이브" />
            </View>
          ),
        }}
      /> */}
      {/* <Stack.Screen
        name="archivegrid"
        options={{
          title: '아카이브 그리드',
          headerLeft: () => (
            <View style={styles.headerContainer}>
              <CustomBackButton />
              <HeaderTitle title="아카이브" />
            </View>
          ),
        }}
      /> */}
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
