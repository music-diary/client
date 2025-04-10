import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import { colorWithOpacity } from '@/utils/color-utils';
import { COLORS, FONTS } from '@/constants';
import { ArrowDownSvg } from 'assets/images/mypage';
import { formatDateString } from '@/utils/date-utils';

interface DropdownComponentProps {
  data: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const DropDownToggle = ({
  data,
  selectedValue,
  onSelect,
}: DropdownComponentProps) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setDropdownVisible(false);
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable
      onPress={() => handleSelect(item)}
      style={[styles.item, index === data.length - 1 && styles.lastItem]}
    >
      <Text style={styles.itemText}>{formatDateString(item)}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleDropdown}>
        <View style={styles.title}>
          <Text style={styles.buttonText}>
            {formatDateString(selectedValue)}
          </Text>
          <ArrowDownSvg fill={COLORS.WHITE} />
        </View>
      </Pressable>
      {isDropdownVisible && (
        <Modal
          transparent={true}
          visible={isDropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPressOut={() => setDropdownVisible(false)}
          >
            <View style={styles.dropdown}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default DropDownToggle;

const styles = StyleSheet.create({
  container: {
    width: 200,
    alignSelf: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colorWithOpacity(COLORS.BLACK, 0.5),
    paddingTop: 170,
    alignItems: 'center',
  },

  dropdown: {
    backgroundColor: '#363636',
    borderRadius: 12,
    marginTop: 5,
    width: 200,
    maxHeight: 210,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: colorWithOpacity(COLORS.WHITE, 0.1),
  },
  itemText: {
    color: COLORS.WHITE,
    ...FONTS.B1,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});
