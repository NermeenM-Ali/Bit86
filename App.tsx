import React, { Component } from 'react';
import { View, StatusBar, LogBox } from 'react-native';
import MainNavigation from './src/navigation';
// import { Provider } from 'mobx-react'
import { Provider } from 'react-redux'
import {store} from './src/redux/Configration'

LogBox.ignoreAllLogs();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor='transparent' barStyle="dark-content" />
          <MainNavigation />
        </View>
      </Provider>
    );
  }
};

export default App;
