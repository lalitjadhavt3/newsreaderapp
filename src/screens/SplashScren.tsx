// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainApp'); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>News Reader</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
  },
});

export default SplashScreen;
