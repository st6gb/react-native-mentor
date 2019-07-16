/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store';

const Application = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Application);
