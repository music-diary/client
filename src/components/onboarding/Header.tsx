import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

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
    color: Colors.white,
    ...Fonts.h1,
  },
  description: {
    color: Colors.white,
    opacity: 0.7,
    ...Fonts.btn,
  },
});
