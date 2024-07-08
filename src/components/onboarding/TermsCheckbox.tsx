import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { openBrowserAsync } from 'expo-web-browser';
import { COLORS, FONTS } from '@/constants';

interface TermsCheckboxProps {
  value: boolean;
  setValue: (value: boolean) => void;
  title: string;
  url: string;
  type?: string;
}

const TermsCheckbox = ({
  value,
  setValue,
  title,
  url,
  type,
}: TermsCheckboxProps) => {
  const handleOpenTerms = () => {
    openBrowserAsync(url);
  };

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
      {url.length > 0 && (
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
