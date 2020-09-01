/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {DeviceEventEmitter} from 'react-native';
// importing Service to call
import ForegroundService from '@supersami/react-native-foreground-service';

// on button click or click on the main activity you will going to receive this as string.
let obj = {routeName: 'mainActivity', routeParams: {data: ''}};
let obj1 = {routeName: 'Second Route', routeParams: {data: ''}};

// Creating a foreground service.
let notificationConfig = {
  id: 434, // unique id of the notification,
  title: 'SuperService', //title of the notification
  message: `I hope you are doing your `, // message in the notification
  vibration: false, // vibration
  visibility: 'public', // visibility, you can learn about theme on google official notification docs
  icon: 'ic_launcher', // make sure you have ic_launcher
  importance: 'max', // importance
  number: String(1), // int specified as string > 0, for devices that support it, this might be used to set the badge counter
  button: true, // if false there will be no button in the notification
  buttonText: 'Checking why are you repeating your self', // text of the button in the foreground service notification
  buttonOnPress: JSON.stringify(obj), // sending strings on click on main notification, you will receive them on device emitter
  mainOnPress: JSON.stringify(obj1), // sensing strings on click on notification, you will receive them on device emitter
};

// Minimal example to start up the foreground service
const a = async (check) => {
  await ForegroundService.startService(notificationConfig);

  await ForegroundService.runTask({
    taskName: 'myTaskName', // name of the task. same as provided in the root file
    delay: 0,
    loopDelay: 5000, // interval of the loop
    onLoop: true, // recurring calls to the headless task, on loop handles by java to run the in certain interval.
  });
};
const App = () => {
  useEffect(() => {
    // device event emitter used to
    let subscip = DeviceEventEmitter.addListener(
      'notificationClickHandle',
      function (e) {
        console.log('json', e);
      },
    );
    return function cleanup() {
      subscip.remove();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>An Example for React Native Foreground Service. </Text>
        <Button title={'Start'} onPress={() => a()} />
        <Button
          title={'Stop'}
          onPress={async () => await ForegroundService.stopService()}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
