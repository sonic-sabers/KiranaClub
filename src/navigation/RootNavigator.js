import React from 'react';
import { StatusBar } from 'react-native';

//Third party imports
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';

//Local imports
import Trending from '../screens/trending';
import { isDarkThemeSelector } from '../store/theme/selector';
import Colors from '../constants/Colors';
const Stack = createStackNavigator();

const RootNavigator = () => {
  const isDarkTheme = useSelector(isDarkThemeSelector);

  return (
    <>
      <StatusBar backgroundColor={!isDarkTheme ? Colors.white.default : Colors.black.default} barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Trending"
            component={Trending}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
