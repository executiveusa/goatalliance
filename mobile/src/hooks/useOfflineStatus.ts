import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from "react";

export function useOfflineStatus() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const subscription = NetInfo.addEventListener((state) => {
      setIsOffline(!(state.isConnected && state.isInternetReachable !== false));
    });
    return () => subscription?.();
    const supportsNavigator = typeof navigator !== "undefined";
    const supportsWindow = typeof window !== "undefined";

    const updateStatus = () => {
      if (supportsNavigator) {
        setIsOffline(navigator.onLine === false);
      }
    };

    updateStatus();

    if (supportsWindow) {
      window.addEventListener("offline", updateStatus);
      window.addEventListener("online", updateStatus);
    }

    return () => {
      if (supportsWindow) {
        window.removeEventListener("offline", updateStatus);
        window.removeEventListener("online", updateStatus);
      }
    };
  }, []);

  return isOffline;
}
