import { useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutRectangle,
} from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { useAppStore } from '@/store/useAppStore';
import { TooltipSvg } from 'assets/images/diary';

const Tooltip = () => {
  const { tooltipRead, setTooltipRead } = useAppStore();
  const [visible, setVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] =
    useState<LayoutRectangle | null>(null);
  const tooltipRef = useRef<TouchableOpacity>(null);

  const showTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTooltipPosition({ x: pageX - 66, y: pageY + 12, width, height });
        setVisible(true);
      });
    }
  };

  const handleTooltipLayout = () => {
    if (tooltipRef.current) {
      tooltipRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTooltipPosition({ x: pageX - 66, y: pageY + 12, width, height });
        setVisible(!tooltipRead);
        setTooltipRead(true);
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLayout={handleTooltipLayout}
        onPress={showTooltip}
        hitSlop={{ top: 8, bottom: 8, left: 16, right: 16 }}
        ref={tooltipRef}
      >
        <TooltipSvg />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          {tooltipPosition && (
            <View
              style={[
                styles.tooltipContainer,
                {
                  top: tooltipPosition.y + tooltipPosition.height,
                  left: tooltipPosition.x,
                },
              ]}
            >
              <View style={styles.tooltip}>
                <>
                  <View style={styles.tooltipArrow} />
                  <Text style={styles.tooltipText}>
                    마음에 드는 가사를 하이라이트해 보세요.
                    {'\n'}
                    최대 3줄까지 일기 카드에 들어가요.
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
          )}
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
  },
  tooltipContainer: {
    position: 'absolute',
    transform: [{ translateX: -50 }],
  },
  tooltip: {
    gap: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.PURPLE,
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
    textAlign: 'center',
    color: COLORS.WHITE,
    ...FONTS.B2,
  },
  tooltipArrow: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -7,
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.PURPLE,
  },
});
