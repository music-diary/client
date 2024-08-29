import { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { type SplashOption, splashOptions } from '@/constants/data/splash';
import { type SplashKey } from '@/models/types';
import { useSplashStore } from '@/store/useSplashStore';
import { COLORS } from '@/constants';
import CustomSplash from '../common/CustomSplash';

interface LoadingViewProps {
  mood: 'good' | 'normal' | 'bad';
}

const LoadingView = ({ mood }: LoadingViewProps) => {
  const { openSplash, closeSplash } = useSplashStore();
  const [splashConfig, setSplashConfig] = useState<SplashOption | null>(null);

  useEffect(() => {
    openSplash('music-recommendation');
    return () => closeSplash();
  }, []);

  useEffect(() => {
    const getRandomSplash = (keys: SplashKey[]): SplashOption => {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return splashOptions[randomKey];
    };

    switch (mood) {
      case 'good':
        setSplashConfig(getRandomSplash(['good1', 'good2', 'good3']));
        break;
      case 'normal':
        setSplashConfig(getRandomSplash(['normal1', 'normal2', 'normal3']));
        break;
      case 'bad':
        setSplashConfig(getRandomSplash(['bad1', 'bad2', 'bad3']));
        break;
      default:
        setSplashConfig(null);
    }
  }, [mood]);

  if (!splashConfig)
    return (
      <>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={COLORS.PURPLE} />
        </View>
      </>
    );

  return (
    <CustomSplash
      name="music-recommendation"
      description={splashConfig.description}
      svg={splashConfig.svg}
      onClose={() => {}}
    />
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
});
