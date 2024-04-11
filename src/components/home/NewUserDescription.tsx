import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const NewUserDescription = ({ description }: { description: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>{description}</Text>
      <MaterialIcons name="arrow-outward" size={20} color={Colors.white} />
    </View>
  );
};

export default NewUserDescription;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bg_light,
    borderRadius: 10,
    marginTop: 16,
    marginRight: 16,
    paddingVertical: 22,
  },
  descriptionText: {
    color: Colors.white,
    paddingRight: 5,
    ...Fonts.b2,
  },
});
