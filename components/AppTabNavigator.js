
import * as React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';
import {Image} from 'react-native';
import {AppStackNavigator} from './AppStackNavigator';
export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen:{
        screen:AppStackNavigator,
        navigationOptions:{
            tabBarIcon: <Image source={require("../assets/searchingbook.png")} style={{width:20, height:20}}/>,
            tabBarLabel:"Home Screen"
        }
    },
    ExchangeScreen:{
        screen:ExchangeScreen,
        navigationOptions:{
            tabBarIcon: <Image source={require("../assets/walking_1.png")} style={{width:20, height:20}}/>,
            tabBarLabel:"Exchange Screen"
        }
    }
})