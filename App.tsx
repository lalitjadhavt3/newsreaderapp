import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { OfflineProvider } from './src/context/OfflineContext';
import AppNavigator from './src/navigations/AppNavigator';

const App: React.FC = () => {
  return (
    <OfflineProvider>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </OfflineProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
