import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

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
          color={Colors.purple}
        />
        <Text style={[styles.title, type === 'all' && Fonts.b2_sb]}>
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
    ...Fonts.b2,
    color: Colors.white,
  },
  openTerms: {
    ...Fonts.btn,
    color: Colors.grey1,
  },
});
