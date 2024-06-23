import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { colorWithOpacity } from '@/utils/colorUtils';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';
import ArrowDown from 'assets/images/mypageIcon/ArrowDown.svg';

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
      style={[
        styles.item,
        index === data.length - 1 && styles.lastItem, // 마지막 항목일 경우 스타일 적용
      ]}
    >
      <Text style={styles.itemText}>{item}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleDropdown}>
        <View style={styles.title}>
          <Text style={styles.buttonText}>{selectedValue} </Text>
          <ArrowDown fill={Colors.white} />
        </View>
      </Pressable>
      {isDropdownVisible && (
        <Modal
          transparent={true}
          visible={isDropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setDropdownVisible(false)}
          >
            <View style={styles.dropdown}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
            </View>
          </TouchableOpacity>
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
    color: Colors.white,
    ...Fonts.b1_sb,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colorWithOpacity(Colors.black, 0.5),
    paddingTop: 170,
    alignItems: 'center',
  },

  dropdown: {
    backgroundColor: '#363636',
    borderRadius: 12,
    marginTop: 5,
    width: 200,
    maxHeight: 300,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: colorWithOpacity(Colors.white, 0.1),
  },
  itemText: {
    color: Colors.white,
    ...Fonts.b1,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});
