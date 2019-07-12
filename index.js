/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import store from './src/store';

const Application = () => {
  return <Provider store={store}><App /></Provider>
}

AppRegistry.registerComponent(appName, () => Application);
