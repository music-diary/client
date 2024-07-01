import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '@/constants';

const NewUserDescription = ({ description }: { description: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>{description}</Text>
      <MaterialIcons name="arrow-outward" size={20} color={COLORS.WHITE} />
    </View>
  );
};

export default NewUserDescription;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 10,
    marginTop: 16,
    marginRight: 16,
    paddingVertical: 22,
  },
  descriptionText: {
    color: COLORS.WHITE,
    paddingRight: 5,
    ...FONTS.B2,
  },
});
