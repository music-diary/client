import { type PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';

interface SelectorViewProps {
  title: string;
  description?: string;
  subDescription?: string;
  required?: boolean;
}

const SelectorView = ({
  title,
  description,
  subDescription,
  required = false,
  children,
}: SelectorViewProps & PropsWithChildren) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleRowContainer}>
          <Text style={styles.title}>{title}</Text>
          {required && <View style={styles.dot} />}
        </View>
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
  titleRowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  title: {
    color: COLORS.WHITE,
    ...FONTS.T1,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 5,
  },
  descriptionContainer: {
    gap: 4,
  },
  description: {
    color: COLORS.WHITE,
    ...FONTS.BTN,
  },
  subDescription: {
    color: COLORS.WHITE,
    fontFamily: 'pret-sb',
    fontSize: 12,
  },
});
