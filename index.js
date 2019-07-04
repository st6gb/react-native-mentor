/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { HttpClientProvider } from "./src/services/HttpClientProvider";
import { name as appName } from './app.json';

const Application = () => {
  return <HttpClientProvider><App /></HttpClientProvider>
}

AppRegistry.registerComponent(appName, () => Application);
