/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ReactNativeForegroundService from '@supersami/react-native-foreground-service';
ReactNativeForegroundService.register();
AppRegistry.registerComponent(appName, () => App);
