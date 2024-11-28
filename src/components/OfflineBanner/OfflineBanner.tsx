import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { OfflineContext } from '../../context/OfflineContext';

export const OfflineBanner: React.FC = () => {
  const { isOffline } = useContext(OfflineContext);
  const [showRestoredMessage, setShowRestoredMessage] = useState(false);
  const fadeAnim = new Animated.Value(1); // Animation for restored message fade-out

  useEffect(() => {
    if (!isOffline) {
      // Show "Connection Restored" message for 3 seconds when connection is back
      setShowRestoredMessage(true);

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        setShowRestoredMessage(false); 
        fadeAnim.setValue(1);
      });
    }
  }, [isOffline]);

  return (
    <>
      {isOffline ? (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>You are offline. Some features may be unavailable.</Text>
        </View>
      ) : (
        showRestoredMessage && (
          <Animated.View style={[styles.restoredBanner, { opacity: fadeAnim }]}>
            <Text style={styles.restoredText}>Your connection has been restored.</Text>
          </Animated.View>
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  offlineBanner: {
    backgroundColor: '#FF4C4C',
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '110%',
    zIndex: 100,
  },
  offlineText: {
    color: '#fff',
    fontSize: 14,
  },
  restoredBanner: {
    backgroundColor: '#4CAF50',
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '110%',
    zIndex: 100,
  },
  restoredText: {
    color: '#fff',
    fontSize: 14,
  },
});
