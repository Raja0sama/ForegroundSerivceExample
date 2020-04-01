/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ForegroundService from 'react-native-foreground-service';

let foregroundTask = async (data) => {
    console.log("I am here",data)
    await myTask();
}

const myTask = () => {
    let i = 0
    
    console.log("Hi")
}
ForegroundService.registerForegroundTask("myTaskName", foregroundTask);
AppRegistry.registerComponent(appName, () => App);
