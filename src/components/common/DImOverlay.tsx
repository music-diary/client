import { StyleSheet, View } from 'react-native';
import { useDimStore } from '@/store/useDimStore';
import Colors from '@/constants/Colors';
import { colorWithOpacity } from '@/utils/color-utils';

const DImOverlay = () => {
  const { isDim } = useDimStore();

  if (!isDim) return null;

  return <View style={styles.overlay} />;
};

export default DImOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colorWithOpacity(Colors.black, 0.7),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
