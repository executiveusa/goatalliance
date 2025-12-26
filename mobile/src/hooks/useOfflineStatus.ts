import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useOfflineStatus() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const subscription = NetInfo.addEventListener((state) => {
      setIsOffline(!(state.isConnected && state.isInternetReachable !== false));
    });
    return () => subscription?.();
  }, []);

  return isOffline;
}
