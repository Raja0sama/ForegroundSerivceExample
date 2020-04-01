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

import ForegroundService from 'react-native-foreground-service';
let obj = { routeName : "mainActivity", routeParams : {data:""} }
let obj1  = { routeName : "mainActivity 1", routeParams : {data:""} }
let notificationConfig = {
  id: 434,
  title: 'SuperService',
  message: `I hope you are doing your `,
  vibration: false,
  visibility: 'public',
  icon: 'ic_launcher',
  importance: 'max',
  number: String(1),
  button: false,
  buttonText: 'Checking why are you repeating your self',
  buttonOnPress :    JSON.stringify(obj),
  mainOnPress :    JSON.stringify(obj1)
};

const a = async check => {
  await ForegroundService.startService(notificationConfig);

  await ForegroundService.runTask({
    taskName: 'myTaskName',
    delay: 0,
    loopDelay : 5000,
    onLoop: true,
  });
};
const App: () => React$Node = () => {
  useEffect(() => {
    
  let subscip =   DeviceEventEmitter.addListener('notificationClickHandle', function(e : Event) {
      console.log("json" ,JSON.parse(e.main));
    });
    return function cleanup() { subscip.remove()}
  },[]);

  const [isrunning, setrunning] = useState(false);
  const check = async () => {
    (await ForegroundService.isRunning())
      ? setrunning(true)
      : setrunning(false);
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{'is running : ' + isrunning}</Text>
        <Button title={'refresh'} onPress={() => check()} />
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
