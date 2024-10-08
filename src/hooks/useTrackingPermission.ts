import { useEffect } from 'react';
import * as TrackingTransparency from 'expo-tracking-transparency';

const useTrackingPermission = () => {
  useEffect(() => {
    (async () => {
      const { status } =
        await TrackingTransparency.requestTrackingPermissionsAsync();
      if (status === 'granted') {
        console.log('Yay! I have user permission to track data');
      }
    })();
  }, []);
};

export default useTrackingPermission;
