import { Tabs } from 'expo-router';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Foundation, Feather, FontAwesome6 } from '@expo/vector-icons';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { COLORS } from '@/constants';
import BottomBarIcon from '@/components/common/BottomBarIcon';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import useTrackingPermission from '@/hooks/useTrackingPermission';

const ratio = 435 / 375;
const currentWidth = Dimensions.get('window').width * ratio;
const currentHeight = (137 / 435) * currentWidth;

export default function TabLayout() {
  usePushNotifications();
  useTrackingPermission();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.PURPLE,
        tabBarInactiveTintColor: COLORS.WHITE,
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle: { display: 'flex', ...styles.tabBarStyle },
        headerTransparent: true,

        tabBarBackground: () => (
          <View style={styles.layout}>
            <BottomBarIcon
              color={COLORS.GREY3}
              width={currentWidth}
              height={currentHeight}
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={21} color={color} />
          ),
          tabBarItemStyle: styles.item,
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="pen-nib" size={17} color={color} />
          ),
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: styles.middleItem,
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="archive" size={18} color={color} />
          ),
          tabBarItemStyle: styles.rightItem,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    height: 103,
    marginBottom: -34,
    borderTopWidth: 0,
    paddingVertical: 0,
    zIndex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },

  layout: {
    alignItems: 'center',
    bottom: 34,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  item: {
    paddingRight: 50,
    paddingBottom: 20,
  },
  middleItem: {
    backgroundColor: COLORS.PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -17,
    left: '50%',
    marginLeft: -30,
    height: 60,
    width: 60,
    borderRadius: 46,
    marginTop: -13,
    zIndex: 1,
    overflow: 'visible',
  },
  rightItem: {
    paddingLeft: 50,
    paddingBottom: 20,
  },
});
