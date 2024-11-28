import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NewsFeed from '../screens/NewsFeed';
import Categories from '../screens/Categories';
import CategoryNews from '../screens/CategoryNews';
import NewsDetail from '../screens/NewsDetails';
import { RootStackParamList } from '../types/navigationParams';
import SplashScreen from '../screens/SplashScren';
import BookmarkedNews from '../screens/BookMarkedNews';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="NewsFeed" component={NewsFeed} />
  </Stack.Navigator>
);

const CategoriesStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Category" component={Categories}  options={{ headerShown: false}} />
    <Stack.Screen name="CategoryNews" component={CategoryNews}  options={{ headerShown: true,title:'Categories'}} />
  </Stack.Navigator>
);

const MainApp = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Categories') {
        iconName = focused ? 'grid' : 'grid-outline';
      } else if (route.name === 'Bookmark') {
        iconName = focused ? 'bookmark' : 'bookmark-outline';
      }
      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#FF8C32',
    tabBarInactiveTintColor: '#626262',
  })}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Categories" component={CategoriesStack} />
    <Tab.Screen name="Bookmark" component={BookmarkedNews} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Splashscreen" component={SplashScreen} />
      <RootStack.Screen name="MainApp" component={MainApp} />
      <RootStack.Screen name="NewsDetail" component={NewsDetail} options={{ headerShown: true,title:'News' }} />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
