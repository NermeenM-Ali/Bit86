import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="SplashScreen">
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='IntroScreen' component={IntroScreen}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='ProductsScreen' component={ProductsScreen}/>
        <Stack.Screen name='ProductDetailsScreen' component={ProductDetailsScreen}/>
        <Stack.Screen name='CartScreen' component={CartScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation




















