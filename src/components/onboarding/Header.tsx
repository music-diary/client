import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';

interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 6,
    paddingHorizontal: 16,
  },
  title: {
    color: COLORS.WHITE,
    ...FONTS.H1,
  },
  description: {
    color: COLORS.WHITE,
    opacity: 0.7,
    ...FONTS.BTN,
  },
});
