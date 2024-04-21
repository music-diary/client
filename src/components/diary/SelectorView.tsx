import { type PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface SelectorViewProps {
  title: string;
  description?: string;
  subDescription?: string;
}

const SelectorView = ({
  title,
  description,
  subDescription,
  children,
}: SelectorViewProps & PropsWithChildren) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.descriptionContainer}>
          {description && <Text style={styles.description}>{description}</Text>}
          {subDescription && (
            <Text style={styles.subDescription}>{subDescription}</Text>
          )}
        </View>
      </View>
      {children}
    </View>
  );
};

export default SelectorView;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 40,
  },
  titleContainer: {
    gap: 6,
  },
  title: {
    color: Colors.white,
    ...Fonts.t1,
  },
  descriptionContainer: {
    gap: 4,
  },
  description: {
    color: Colors.white,
    ...Fonts.btn,
  },
  subDescription: {
    color: Colors.white,
    fontFamily: 'pret-sb',
    fontSize: 12,
  },
});
