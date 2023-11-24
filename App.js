
import React, { useState } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native';

//local imports
import SplashScreen from './src/screens/splash';
import store from './src/store';

const App = () => {

  // Hides splash screen
  setTimeout(() => {
    setIsLoading(false)
  }, 1000);

  const [isLoading, setIsLoading] = useState(true)
  return (
    isLoading ?
      <SplashScreen />
      :
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </SafeAreaView>
  );
};

export default App;
