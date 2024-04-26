import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface HeaderContentItemProps {
  iconType: 'Feather' | 'Ionicons' | 'FontAwesome5';
  iconName: string;
  text: string;
  number: string;
  onPress?: () => void; // 클릭 이벤트
}

const HeaderContentItem = ({
  iconType,
  iconName,
  text,
  number,
  onPress,
}: HeaderContentItemProps) => {
  let IconComponent;

  switch (iconType) {
    case 'Feather':
      IconComponent = Feather;
      break;
    case 'Ionicons':
      IconComponent = Ionicons;
      break;
    case 'FontAwesome5':
      IconComponent = FontAwesome5;
      break;
    default:
      IconComponent = null;
  }

  return (
    <TouchableOpacity style={styles.headerContentItem} onPress={onPress}>
      {IconComponent && (
        <IconComponent name={iconName} size={20} color={Colors.white} />
      )}
      <Text style={styles.contentText}>{text}</Text>
      <Text style={styles.contentNumber}>{number}</Text>
    </TouchableOpacity>
  );
};

export default HeaderContentItem;

const styles = StyleSheet.create({
  headerContentItem: {
    backgroundColor: Colors.bg_light,
    height: 88,
    width: 76,
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
  },
  contentText: {
    paddingTop: 8,
    color: Colors.white,
    ...Fonts.btn,
  },
  contentNumber: {
    paddingTop: 10,
    color: Colors.white,
    ...Fonts.b2_sb,
  },
});
