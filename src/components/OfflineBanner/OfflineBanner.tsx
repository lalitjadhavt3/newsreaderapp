import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OfflineContext } from '../../context/OfflineContext';

export const OfflineBanner: React.FC = () => {
  const { isOffline } = useContext(OfflineContext);
  if (!isOffline) return null; 
  return (
    <View style={styles.offlineBanner}>
      <Text style={styles.offlineText}>You are offline. Some features may be unavailable.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  offlineBanner: {
    backgroundColor: '#FF4C4C',
    padding: 20,
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
});
