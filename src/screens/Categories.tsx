
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CATEGORY_MAPPING from '../constants/categories';
import { OfflineBanner } from '../components/OfflineBanner/OfflineBanner';

const Categories = ({ navigation }: { navigation: any }) => {
  const categories = Object.keys(CATEGORY_MAPPING);

  const renderCategoryCard = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CategoryNews', { category: item })}
    >
      <Text style={styles.cardText}>{CATEGORY_MAPPING[item]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <OfflineBanner/>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderCategoryCard}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFDEAD',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3131',
  },
});

export default Categories;
