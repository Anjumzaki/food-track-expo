import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store, persister } from './src/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import AppNavigator from './src/AppNavigator';

class App extends Component {
  render() {
    return (
      <PersistGate loading={null} persistor={persister}>
        <Provider {...{ store }}>
          <StatusBar style="auto" />
          <AppNavigator />
        </Provider>
      </PersistGate>

    )
  }
}

export default App