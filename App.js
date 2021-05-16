import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppTabNavigator} from './components/AppTabNavigator';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import CustomSideBarMenu from './components/CustomSideBarMenu';

export default class App extends React.Component {
  render(){
  return (
    <AppContainer/>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
const switchNavigator= createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:AppDrawerNavigator,
  
})

const AppContainer = createAppContainer(switchNavigator);