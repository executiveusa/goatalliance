import { useEffect, useState } from "react";

export function useOfflineStatus() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
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
