import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TrashSvg } from 'assets/images/archive';
import { COLORS, FONTS } from '@/constants';

const HeaderModalView = ({
  onSavePress,
  onDeletePress,
}: {
  onSavePress: () => void;
  onDeletePress: () => void;
}) => {
  return (
    <View style={styles.modal}>
      <TouchableOpacity style={styles.modalContent} onPress={onSavePress}>
        <Text style={styles.b1WhiteText}>저장</Text>
        <MaterialCommunityIcons
          name="arrow-collapse-down"
          size={20}
          color="white"
        />
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.modalContent} onPress={onDeletePress}>
        <Text style={styles.b1RedText}>삭제</Text>
        <TrashSvg fill={COLORS.RED} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderModalView;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#2A2B2B', // 추후 수정 필요할 수도..!
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    paddingHorizontal: 16,
    borderRadius: 16,
    zIndex: 1,
  },
  modalContent: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 0.5,
    backgroundColor: COLORS.CONTENTS_LIGHT,
    marginHorizontal: -16,
  },
  b1WhiteText: {
    color: COLORS.WHITE,
    ...FONTS.B1,
  },
  b1RedText: {
    color: COLORS.RED,
    ...FONTS.B1,
  },
});
