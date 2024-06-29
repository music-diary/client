import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  type ImageSourcePropType,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { TooltipSvg } from 'assets/images/diary';

interface CustomTooltipProps {
  tooltipText?: string;
  imageSource?: ImageSourcePropType;
}

const Tooltip = ({ tooltipText }: CustomTooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <TooltipSvg />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={visible} // `visible` 상태에 따라 모달을 제어합니다.
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.tooltipContainer}>
            <View style={styles.tooltip}>
              <>
                <View style={styles.tooltipArrow} />
                <Text style={styles.tooltipText}>
                  마음에 드는 가사를 하이라이트해 보세요.
                  {'\n'}
                  최대 3줄까지 선택해 일기 카드에 넣을 수 있어요.
                </Text>
              </>
              <AntDesign
                size={16}
                name="close"
                color="white"
                onPress={() => setVisible(false)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Tooltip;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    position: 'absolute',
    top: '52%', // Image 컴포넌트 아래로 위치 조정
    left: '31.6%',
    transform: [{ translateX: -50 }], // 가로축 중앙 정렬
  },
  tooltip: {
    flexDirection: 'row',
    backgroundColor: Colors.purple,
    paddingLeft: 14,
    paddingRight: 6.6,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    position: 'relative',
  },
  tooltipText: {
    color: Colors.white,
    ...Fonts.b2,
  },
  tooltipArrow: {
    position: 'absolute',
    top: -20, // 변경된 tooltip 위치에 맞게 조정
    left: '50%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.purple,
  },
});
