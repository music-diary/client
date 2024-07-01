import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { COLORS, FONTS } from '@/constants';

interface TermsCheckboxProps {
  value: boolean;
  setValue: (value: boolean) => void;
  title: string;
  type?: string;
  handleOpenTerms?: () => void;
}

const TermsCheckbox = ({
  value,
  setValue,
  title,
  type,
  handleOpenTerms,
}: TermsCheckboxProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Checkbox
          style={styles.checkbox}
          value={value}
          onValueChange={setValue}
          color={COLORS.PURPLE}
        />
        <Text style={[styles.title, type === 'all' && FONTS.B2_SB]}>
          {title}
        </Text>
      </View>
      {type !== 'all' && (
        <TouchableOpacity onPress={handleOpenTerms}>
          <Text style={styles.openTerms}>보기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TermsCheckbox;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 15,
    height: 15,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    ...FONTS.B2,
    color: COLORS.WHITE,
  },
  openTerms: {
    ...FONTS.BTN,
    color: COLORS.GREY1,
  },
});
