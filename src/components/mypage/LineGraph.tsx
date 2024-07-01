import { Dimensions, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS, FONTS } from '@/constants';
import { type LineGraphDataProps } from '@/models/interfaces';

const ContainerWidth = Dimensions.get('window').width - 34;
const LineGraph = ({ data }: LineGraphDataProps) => {
  const chartConfig = {
    backgroundGradientFrom: COLORS.GREY3,
    backgroundGradientTo: COLORS.GREY3,
    decimalPlaces: 0,
    color: (opacity = 0.5) => `rgba(120, 80, 248, ${opacity})`, // 그래프 선 색상
    labelColor: (opacity = 0.2) => `rgba(256, 256, 256, ${opacity})`, // 라벨 색상
    propsForDots: {
      r: '2',
    },
    propsForLabels: {
      ...FONTS.LB,
    },
    strokeWidth: 2,
  };

  const labels = data.map((item) => `${item.month}월`);
  const values = data.map((item) => item.count);

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: values,
            },
          ],
        }}
        width={ContainerWidth}
        height={170}
        chartConfig={chartConfig}
        withVerticalLines={false}
        style={styles.chart}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ContainerWidth,
    height: 170,
    overflow: 'hidden',
  },
  chart: {
    marginLeft: -20,
  },
});

export default LineGraph;
