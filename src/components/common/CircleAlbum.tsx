import { View, Image, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface CircleComponentProps {
  order?: number;
  color: string;
  imageSource: string;
  diameter: number;
}

// 재사용 가능하도록 size를 props로 받아서 사용
const CircleAlbum = ({
  order,
  color,
  imageSource,
  diameter,
}: CircleComponentProps) => {
  return (
    <View
      style={[
        styles.albumCircle,
        {
          zIndex: order,
          backgroundColor: color,
          height: diameter,
          width: diameter,
          borderRadius: diameter / 2,
        },
      ]}
    >
      <BlurView
        intensity={8}
        tint="light"
        style={[
          styles.blurStyle,
          { height: diameter, width: diameter, borderRadius: diameter / 2 },
        ]}
      >
        <Image
          style={{
            height: diameter / 2,
            width: diameter / 2,
            borderRadius: diameter / 4,
          }}
          source={{ uri: imageSource }}
        />
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  albumCircle: {
    borderColor: 'rgba(255,255,255, 0.1)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  blurStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircleAlbum;
