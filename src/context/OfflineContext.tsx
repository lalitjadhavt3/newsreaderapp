import React, { createContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

type OfflineContextType = {
  isOffline: boolean;
};

export const OfflineContext = createContext<OfflineContextType>({ isOffline: false });

export const OfflineProvider: React.FC= ({ children }) => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  useEffect(() => {
    // Listen for network status changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected); // Set offline status based on connection state
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <OfflineContext.Provider value={{ isOffline }}>
      {children}
    </OfflineContext.Provider>
  );
};

